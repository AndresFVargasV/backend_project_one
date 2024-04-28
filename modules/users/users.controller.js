const { model } = require('mongoose');
const {readUsersMongo, createUserMongo} = require('./users.actions');

async function readUsers(query){
    const searchResult = await readUsersMongo(query);
    
    return searchResult;
}

async function createUser(data){
    const creationResult = await createUserMongo(data);

    return creationResult;
}

model.exports = {
    readUsers,
    createUser
}