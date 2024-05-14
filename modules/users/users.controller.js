const {
  readUsersbyIDMongo,
  createUserMongo,
  updateUserMongo,
  deleteUserMongo,
} = require("./users.actions");
const jwt = require("jsonwebtoken");
const dotend = require("dotenv");
const _ = require("lodash");

dotend.config();

async function readUsersbyID(data) {
  const searchResult = await readUsersbyIDMongo(data);

  if (!searchResult || !searchResult.active) {
    throw new Error("No existe el usuario");
  }

  return searchResult;
}

async function createUser(data, token) {
  const identification = data.mail;

  const user = await readUsersbyIDMongo(identification);

  if (user && user.active) {
    throw new Error("El usuario ya existe");
  }

  if (user && !user.active) {
    const update = await updateUserMongo(user._id, { active: true });

    return update;
  }

  const creationResult = await createUserMongo(data);
  return creationResult;
}

async function updateUser(data, iduser, token) {
  // Verificar el token JWT para obtener el ID de usuario
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // 'SECRET_KEY' es la clave secreta para firmar y verificar el token
  const userId = decodedToken._id;

  const existingUser = await readUsersbyIDMongo(userId);

  if (!existingUser || !existingUser.active) {
    throw new Error("Usuario no encontrado");
  }

  if (userId !== _.toString(iduser)) {
    throw new Error("No hay coincidencia de usuario");
  }

  const updateResult = await updateUserMongo(userId, data);

  return updateResult;
}

async function deleteUser(data, token) {
  // Verificar el token JWT para obtener el ID de usuario
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // 'secreto' es la clave secreta para firmar y verificar el token
  const userId = decodedToken._id;

  if (userId !== data) {
    throw new Error("No hay coincidencia de usuario");
  }

  const existingUser = await readUsersbyIDMongo(userId);
  

  if (!existingUser || !existingUser.active) {
    throw new Error("Usuario no encontrado");
  }

  const deleteResult = await deleteUserMongo(data);

  return deleteResult;
}

module.exports = {
  readUsersbyID,
  createUser,
  updateUser,
  deleteUser,
};
