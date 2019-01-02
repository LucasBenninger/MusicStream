const express = require("express");
const router = express.Router();

const Song = require("../../../models/Song");

// Get an Artist's Songs
router.get("/:artist/tracks", (req, res) => {
	const artist = req.params.artist;
	Song.find({ artist })
		.then(songs => {
			res.send(songs);
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		});
});

// Get an artists songs by album
router.get("/:artist/:album/tracks", (req, res) => {
	const artist = req.params.artist;
	const album = req.params.album;
	Song.find({ artist, album })
		.then(songs => {
			res.send(songs);
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		});
});

module.exports = router;
