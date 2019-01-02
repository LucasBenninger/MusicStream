const express = require("express");
const router = express.Router();
const configFile = "../config/config.json";
const config = require(configFile);
const fs = require("fs");
const mm = require("musicmetadata");
const Song = require("../models/Song");

router.get("/", (req, res) => {
	res.render("setup/index", { title: "Setup", config });
});

router.post("/config", (req, res) => {
	if (req.body.musicDir) {
		config.musicDir = req.body.musicDir;
		fs.writeFile(__dirname + "/" + configFile, JSON.stringify(config), err => {
			console.log(err);
		});
	}
	res.render("setup/index", { title: "Setup", config });
});

router.post("/scan", (req, res) => {
	getFiles(config.musicDir);

	res.render("setup/index", {
		message: `Scanning dir ${config.musicDir}`,
		config
	});
});

router.post("/destroy", (req, res) => {
	// Removes all songs from database
	// Will need to rescan
	Song.remove({})
		.save()
		.then(
			res.render("setup/index", { message: `Clearing Database...`, config })
		)
		.catch(err => console.log(err));
});

function getFiles(dir) {
	fs.readdir(dir, { withFileTypes: true }, (err, files) => {
		if (err) {
			throw err;
		}
		files.forEach(file => {
			if (file.isDirectory()) {
				getFiles(dir + "/" + file.name);
			}
			// console.log(file.name);
			if (file.name.endsWith(".ogg") || file.name.endsWith(".mp3")) {
				var parser = mm(
					fs.createReadStream(dir + "/" + file.name),
					(err, metadata) => {
						if (err) {
							throw err;
						}
						// Strip Music Directory from file location
						var tempLocation = dir + "/" + file.name;
						tempLocation = tempLocation.replace(config.musicDir, "/static");

						const newSong = Song({
							trackNumber: metadata.track.no,
							title: metadata.title,
							artist: metadata.artist,
							album: metadata.album,
							year: metadata.year,
							picture: metadata.picture.data,
							genre: metadata.genre,
							disk: metadata.disk.no,

							location: tempLocation
						})
							.save()
							.catch(err => console.log(err));
					}
				);
			}
		});
	});
}

module.exports = router;
