const axios = require("axios");

async function obtaingUser(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = obtaingUser;
