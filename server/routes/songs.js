const express = require("express");
const router = express.Router();

const Song = require("../models/Song");

router.get("/search", (req, res) => {
	var term = req.query.term;
	Song.find({
		$or: [
			{ title: new RegExp("^" + term, "i") },
			{ artist: new RegExp("^" + term, "i") }
		]
	})
		.limit(30)
		.then(songs => {
			res.render("index", { songs, term });
		})
		.catch(err => console.log(err));
});

module.exports = router;
