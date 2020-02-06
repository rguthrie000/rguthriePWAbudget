// Budget Tracker, a Progressive Web Application (PWA)
// 20200206

// I get by with a little help from my friends...
const express     = require("express");
const mongoose    = require("mongoose");
const logger      = require("morgan");
const compression = require("compression");

// "External" db setup (When offline, IndexedDB will be used.)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Express setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(require("./routes/api.js"));
app.use(logger("dev"));
app.use(compression());

// Let's go to work!
const PORT = process.env.PORT ? process.env.PORT : 3000;
app.listen(PORT, () => {
  console.log(`Serving ${PORT}`);
});
