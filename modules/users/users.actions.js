const User = require('./users.model'); 

async function readUsersMongo() {
    const users = await User.find();

    return users;
}

async function createUserMongo(data) {
    const userCreated = User.create(data);

    return userCreated;
}


module.exports = {
    readUsersMongo,
    createUserMongo
};