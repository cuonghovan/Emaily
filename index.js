const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
passport.use(new GoogleStrategy());

// Id: 191931269296-vc68uk44ftre4nc59qgprfiaaitn5gb9.apps.googleusercontent.com
// Secret: M5fcPYkwglkIKdg1Wk_kCuui
// heroku: https://lychee-tart-89195.herokuapp.com/

const PORT = process.env.PORT || 5000;
app.listen(PORT);
