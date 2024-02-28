const express = require("express")
const User = require("../models/Users")
const {validateUser} = require("../validator")
const _ = require("lodash")
const bcrypt = require("bcrypt")

const router = express.Router()

router.post("/", async(req, res)=>{
    const {error} = validateUser(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }

    let email = await User.findOne({email: req.body.email})
    if (email) {
        return res.send("exist")
    }

    let username = await User.findOne({username: req.body.username})
    if (username) {
        return res.send("exist")
    }

    try{
        let user = new User(_.pick(req.body, ["username", "email", "password"]))
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        user = await user.save()
        res.json(_.pick(user, ["username", "email"]))
    }catch(err){
        res.send(err)
    }
})

module.exports = router

