const User = require('./users.model'); 

async function readUsersbyIDMongo(data) {
    const user = await User.findOne({
        $or: [
          { identification: data },
          { mail: data }
        ]
      }).lean();

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
    const userUpdated = await User.updateOne({ identification: userId }, data);

    return userUpdated;
}

async function deleteUserMongo(userId) {
    const userDeleted = await User.updateOne({ identification: userId }, { active: false});

    return userDeleted;
}


module.exports = {
    readUsersMongo,
    readUsersbyIDMongo,
    createUserMongo,
    updateUserMongo,
    deleteUserMongo
};