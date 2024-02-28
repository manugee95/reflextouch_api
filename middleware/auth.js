const jwt = require("jsonwebtoken")
const config = require("config")

function login_required(req, res, next){
    const token = req.header("x-auth-token")
    if (!token) {
        return res.send("Access Denied")
    }

    try{
        const decoded = jwt.verify(token, config.get("privateKey"))
        req.user = decoded 
        next()
    }catch(err){
        console.log(err)
        res.send(err)
    }
}

module.exports = login_required