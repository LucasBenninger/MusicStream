const express = require("express");
const router = express.Router();

const Song = require("../../../models/Song");

// Albums API Route

// Get an Album's Songs
router.get("/:album/tracks", (req, res) => {
	const album = req.params.album;
	Song.find({ album })
		.then(songs => {
			res.send(songs);
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		});
});

module.exports = router;
