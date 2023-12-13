const {mongoose, model} = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

module.exports = model('Token', tokenSchema);
