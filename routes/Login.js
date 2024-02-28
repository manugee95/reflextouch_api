const express = require("express")
const User = require("../models/Users")
const bcrypt = require("bcrypt")
const {validateLogin} = require("../validator")

const router = express.Router()

router.post("/", async(req, res)=>{
    const {error} = validateLogin(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }

    let user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.json("invalid")
    }

    try{
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.json("invalid")
        }

        const token = user.generateAuthToken()
        res.json({token})
    }catch(err){
        res.json(err)
    }
})

module.exports = router 
