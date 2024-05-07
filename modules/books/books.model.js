const mongoose = require('mongoose')

const libroSchema = new mongoose.Schema({
  idUSer: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String, required: true },
  datePublisher: { type: Date, required: true },
  publisher: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true }
}, {
  versionKey: false,
  timestamps: true
});

const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;
