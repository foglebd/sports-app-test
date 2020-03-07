const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://heroku_t3xl531g:c0l0r@d0@ds035488.mlab.com:35488/heroku_t3xl531g",
)

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
