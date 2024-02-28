const Joi = require("joi")

const validator = (schema) => (payload) => schema.validate(payload)

const feedbackSchema = Joi.object({
    text: Joi.string().required(),
    rating: Joi.number().required()
})

const userSchema = Joi.object({
    username: Joi.string().max(20).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

exports.validateFeedback = validator(feedbackSchema)
exports.validateUser = validator(userSchema)
exports.validateLogin = validator(loginSchema)