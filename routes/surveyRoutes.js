const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/mailTemplate/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch(error) {
      res.status(422).send({error: 'Something went wrong!'})
    }
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    const events = _.chain(req.body)
      .map(event => {
        if (event.url) {
          const pathname = new URL(event.url).pathname;
          const match = p.test(pathname);
          
          if (match) {
            return {email: event.email, ...match};
          }
        }
        return;
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({surveyId, email, choice}) => {
        // Send query to db server and execute it right in the mongo db server => better performance
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true},
          lastResponded: Date.now
        }).exec();
      })
      .value();

    res.send({});
  });
};
