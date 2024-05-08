const {
  readUsersMongo,
  readUsersbyIDMongo,
  createUserMongo,
  updateUserMongo,
  deleteUserMongo,
} = require("./users.actions");
const jwt = require("jsonwebtoken");
const dotend = require("dotenv");

dotend.config();

async function readUsersbyID(data) {
  const searchResult = await readUsersbyIDMongo(data);

  if (!searchResult) {
    throw new Error("No existe el usuario");
  }

  return searchResult;
}

async function readUsers() {
  const searchResult = await readUsersMongo();

  if (!searchResult) {
    throw new Error("No se encontraron usuarios");
  }

  return searchResult;
}

async function createUser(data, token) {

  const identification = data.identification;

  const user = await readUsersbyIDMongo(identification);

  if (user && user.active) {
    throw new Error("El usuario ya existe");
  }

  const creationResult = await createUserMongo(data);
  return creationResult;
}

async function updateUser(data, token) {
  // Verificar el token JWT para obtener el ID de usuario
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // 'SECRET_KEY' es la clave secreta para firmar y verificar el token
  const userId = decodedToken.identification;

  const existingUser = await readUsersbyIDMongo(userId);

  if (!existingUser || !existingUser.active) {
    throw new Error("Usuario no encontrado");
  }

  const updateResult = await updateUserMongo(userId, data);

  return updateResult;
}

async function deleteUser(data, token) {
  // Verificar el token JWT para obtener el ID de usuario
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // 'secreto' es la clave secreta para firmar y verificar el token
  const userId = decodedToken.identification;

  if (userId !== data) {
    throw new Error("No hay coincidencia de usuario");
  }

  const existingUser = await readUsersbyIDMongo(userId);

  if (!existingUser || !existingUser.active) {
    throw new Error("Usuario no encontrado o ya fue eliminado");
  }

  const deleteResult = await deleteUserMongo(data);

  return deleteResult;
}

module.exports = {
  readUsers,
  readUsersbyID,
  createUser,
  updateUser,
  deleteUser,
};
