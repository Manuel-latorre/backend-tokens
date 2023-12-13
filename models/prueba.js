const {mongoose, model} = require("mongoose");

const pruebaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = model('Prueba', pruebaSchema);


