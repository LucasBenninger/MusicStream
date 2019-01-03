var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = new Schema({
	trackNumber: Number,
	title: String,
	artist: String,
	album: String,
	year: String,
	picture: Buffer,
	genre: String,
	disk: Number,
	playcount: {
		type: Number,
		default: 0
	},

	location: {
		required: true,
		type: String
	}
});
module.exports = Song = mongoose.model("songs", SongSchema);
