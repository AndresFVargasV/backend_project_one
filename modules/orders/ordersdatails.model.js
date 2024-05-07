import mongoose from 'mongoose';

const detallePedidoSchema = new mongoose.Schema({
  idBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro' },
  idOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }
}, {
  versionKey: false,
  timestamps: true
});

const DetallePedido = mongoose.model('DetallePedido', detallePedidoSchema);

module.exports = DetallePedido;
