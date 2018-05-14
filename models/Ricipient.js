const mongoose = require("mongoose");
const { Schema } = mongoose;

const RicipientSchema = new Schema({
  email: String,
  responed: {type: Boolean, default: false}
});

module.exports = RicipientSchema;
