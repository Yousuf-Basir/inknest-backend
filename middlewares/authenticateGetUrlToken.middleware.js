const jwt = require("jsonwebtoken");

// This middleware checks all GET requests that has JWT access token in query parameter.
const authenticateGetUrlToken = (req, res, next) => {
    const token = req.query.token
    if(token == null) return res.sendStatus(401);

    // Validate JWT access token and pass the dycrypted jwt payload as user object through next()
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

module.exports = authenticateGetUrlToken;