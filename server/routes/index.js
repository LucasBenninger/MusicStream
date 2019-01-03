const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

router.get("/", (req, res) => {
	Song.find({})
		.limit(30)
		.then(songs => {
			res.render("index", { title: "Music Streamer", songs });
		});
});

module.exports = router;
