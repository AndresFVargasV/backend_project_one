import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  identification: { type: String, required: true },
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
