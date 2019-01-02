const express = require("express");
const router = express.Router();

const Song = require("../../../models/Song");

// Search Songs/Albums/Artists
router.get("/:query", (req, res) => {
	var term = req.query.term;
	Song.find({
		$or: [
			{ title: new RegExp("^" + term, "i") },
			{ album: new RegExp("^" + term, "i") },
			{ artist: new RegExp("^" + term, "i") }
		]
	})
		.limit(30)
		.then(songs => {
			res.send(songs);
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		});
});

module.exports = router;
