const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    //Check header value
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; //only take access token
        //verify access token
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).json("You are not authenticated");
    }
}

module.exports.verifyTokenAndAuthorization = (req, res, next) => {
    //first verify token then check if id is same as token id or user is Admin
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    })
}


module.exports.verifyTokenAndAdmin = (req, res, next) => {
    //first verify token then check if user is Admin
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    })
}