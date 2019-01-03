const express = require("express");
const expresshbs = require("express-handlebars");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys.js").mongoURI;
const serveIndex = require("serve-index");
// Config
const configFile = "./config/config.json";
const config = require(configFile);

mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log("MognoDB Connected");
	})
	.catch(err => console.log(err));

const app = express();

// Middleware
//app.use(express.static("public"));
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View Engine
app.set("views", __dirname + "/views");
app.engine(
	"handlebars",
	expresshbs({ defaultLayout: __dirname + "/views/layouts/main" })
);
app.set("view engine", "handlebars");

// Routes
app.use(
	"/static",
	express.static(config.musicDir),
	serveIndex(config.musicDir, { icons: true })
);

const indexRoute = require("./routes/index");
app.use("/", indexRoute);

const setupRoute = require("./routes/setup");
app.use("/setup", setupRoute);

const songRoute = require("./routes/songs");
app.use("/songs", songRoute);

// API Routes
const albumRouteV1 = require("./routes/api/v1/albums");
const artistRouteV1 = require("./routes/api/v1/artists");
const searchRouteV1 = require("./routes/api/v1/search");
const songsRouteV1 = require("./routes/api/v1/songs");

app.use("/api/v1/album", albumRouteV1);
app.use("/api/v1/artist", artistRouteV1);
app.use("/api/v1/search", searchRouteV1);
app.use("/api/v1/songs", songsRouteV1);

// Port
const port = process.env.PORT || 3000;
// Listen
app.listen(port, () => {
	console.log(`Listening on Port http://127.0.0.1:${port}`);
});
