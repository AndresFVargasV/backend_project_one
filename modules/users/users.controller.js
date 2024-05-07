const {readUsersMongo, readUsersbyIDMongo, createUserMongo} = require('./users.actions');


async function readUsersbyID(data){
    const searchResult = await readUsersbyIDMongo(data);

    if (!searchResult) {
        throw new Error("No existe el usuario");
    }
    
    return searchResult;
}

async function readUsers(){
    const searchResult = await readUsersMongo();

    if (!searchResult) {
        throw new Error("No se encontraron usuarios");
    }
    
    return searchResult;
}

async function createUser(data){

    const identification = data.identification;
    
    const user = await readUsersbyIDMongo(identification);

    if (user) {
        throw new Error("El usuario ya existe");
    } else {
        const creationResult = await createUserMongo(data);
        return creationResult;
    }
    
}

async function updateUser(data) {
    const updateResult = await updateUserMongo(data);

    return updateResult;
}

async function deleteUser(data) {
    const deleteResult = await deleteUserMongo(data);

    return deleteResult;
}

module.exports = {
    readUsers,
    readUsersbyID,
    createUser,
    updateUser,
    deleteUser
}