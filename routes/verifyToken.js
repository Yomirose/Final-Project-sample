const jwt = require("jsonwebtoken");
const { modelName } = require("../models/user");

const verifyToken =(req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res,()=>{
        if(req.user.id === req.params.id || req.user.email){
            next();
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    });
};
module.exports = { verifyToken, verifyTokenAndAuthorization };