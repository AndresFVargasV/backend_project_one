import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  state: { type: String, required: true },
  date: { type: Date, required: true },
  totalPrice: { type: Number, required: true }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;
