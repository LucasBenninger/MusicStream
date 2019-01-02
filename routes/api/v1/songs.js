const express = require("express");
const router = express.Router();

const Song = require("../../../models/Song");

// Get All Songs
router.get("/", (req, res) => {
	Song.find({})
		.then(songs => {
			res.send(songs);
		})
		.catch(err => res.send(err));
});

router.get("/:id", (req, res) => {
	var songId = req.params.id;
	Song.findOne({ _id: songId })
		.then(song => {
			res.send(song);
		})
		.catch(err => res.send(err));
});

module.exports = router;
