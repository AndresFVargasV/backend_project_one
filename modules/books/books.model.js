const mongoose = require('mongoose')

const libroSchema = new mongoose.Schema({
  idUSer: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  dateAdd: { type: Date, required: true },
  publisher: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true }
});

const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;
