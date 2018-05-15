const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.post('api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, ricipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      ricipients: ricipients.split(',').map(email => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
