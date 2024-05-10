const User = require('./users.model'); 
const mongoose = require('mongoose');

async function readUsersbyIDMongo(data) {
    const isObjectId = mongoose.Types.ObjectId.isValid(data);

    let user;

    if (isObjectId) {
        // Si data es un ObjectId válido, buscar por _id
        user = await User.findOne({ _id: data }).lean();
    } else {
        // Si data no es un ObjectId válido, buscar por mail
        user = await User.findOne({ mail: data }).lean();
    }

    return user;
}

async function readUsersMongo() {
    const users = await User.find();

    return users;
}

async function createUserMongo(data) {
    const userCreated = User.create(data);

    return userCreated;
}

async function updateUserMongo(userId, data) {
    const userUpdated = await User.updateOne({ _id: userId }, data);

    return userUpdated;
}

async function deleteUserMongo(userId) {
    const userDeleted = await User.updateOne({ _id: userId }, { active: false});

    return userDeleted;
}


module.exports = {
    readUsersMongo,
    readUsersbyIDMongo,
    createUserMongo,
    updateUserMongo,
    deleteUserMongo
};