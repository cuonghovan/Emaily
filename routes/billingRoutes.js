const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// Middleware `requireLogin` is applied for only requests whose handler specify it as argument
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // Finalize the charge
    const charge = await stripe.charges.create({
      amount: 500,
      description: '$5 for 5 credits',
      currency: 'usd',
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
