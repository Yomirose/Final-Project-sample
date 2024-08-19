const {verifyToken, verifyTokenAndAuthorization} = require("./verifyToken");
const router = require("express").Router();
const JWT_SECRET = process.env.JWT_SECRET;
const crypto = require('crypto');



router.put("/:id", verifyTokenAndAuthorization, (req, res)=>{
    if(req.body.password) {
        req.body.password = crypto.AES.encrypt(
            req.body.password,JWT_SECRET
        ).toString();
    }
}) 

module.exports = router;