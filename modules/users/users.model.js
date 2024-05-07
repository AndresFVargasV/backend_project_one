const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema(
  {
    identification: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Hook pre-save para hashear la contraseña antes de guardar el documento
userSchema.pre("save", async function (next) {
  // Asegúrate de hashear la contraseña solo si ha sido modificada (o es nueva)
  if (!this.isModified("password")) return next();

  try {
    // Genera el hash de la contraseña y lo asigna al campo de la contraseña
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    // Pasa el error al siguiente middleware o a la función que maneja errores
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
