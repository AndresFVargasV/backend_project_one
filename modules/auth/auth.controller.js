const obtaingUser = require("./auth.actions");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function login(data) {
  const validation = await obtaingUser(data.mail);

  console.log(validation);

  if (
    validation.mail === data.mail &&
    (await passValidate(data.password, validation.password))
  ) {

    const token = jwt.sign({ email: data.mail, identifaction: data.identifaction}, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return { token: token, email: data.mail, identifaction: data.identifaction };

  } else {
    throw new Error("Usuario o contraseña incorrectos");
  }
}

async function passValidate(pass, hash) {
  return await argon2.verify(hash, pass);
}


module.exports = {login}