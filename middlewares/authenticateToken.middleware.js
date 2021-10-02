const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // Get access token from http header
    const token = req.headers["token"];
    if(token == null) return res.sendStatus(401);

    // Validate JWT access token and pass the dycrypted jwt payload as user object through next()
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;