const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
passport.use(new GoogleStrategy());
const PORT = process.env.PORT || 5000;

// heroku: https://lychee-tart-89195.herokuapp.com/
app.listen(PORT);
