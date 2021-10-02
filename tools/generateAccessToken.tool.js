const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    console.log(user);
    const accessToken = jwt.sign(user, process.env.TOKEN_SECRET);
    return accessToken;
}

module.exports = generateAccessToken;