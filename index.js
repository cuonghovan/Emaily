const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

require("./routes/auth")(app);

const PORT = process.env.PORT || 5000;

// heroku: https://lychee-tart-89195.herokuapp.com/
app.listen(PORT);
