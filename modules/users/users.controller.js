const { model } = require('mongoose');
const {readUsersMongo, createUserMongo} = require('./users.actions');

async function readUsers(){
    const searchResult = await readUsersMongo();
    
    return searchResult;
}

async function createUser(data){
    
    const creationResult = await createUserMongo(data);

    return creationResult;
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
    createUser,
    updateUser,
    deleteUser
}