const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const config = require("config")

const userSchema = new mongoose.Schema({
    username: {type: String, maxlength: 20, required:true, unique:true},
    email: {type: String, maxlength: 255, required:true, unique:true},
    password: {type: String, required:true}
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get("privateKey"))
    return token
}

const User = mongoose.model("User", userSchema)

module.exports = User 