const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
// These below middlewares are applied for all incoming requests.
app.use(bodyParser.json());

// Use cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]      
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Express will serve up in priority order
// 1. Fisrt looking for request handlers.
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === 'production') {
  // 2. Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // 3. Express will serve up the index.html file
  // if it does'nt recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

// heroku: https://lychee-tart-89195.herokuapp.com/
app.listen(PORT);
