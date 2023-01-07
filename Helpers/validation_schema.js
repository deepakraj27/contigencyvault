const Joi = require('joi');
const minPasswordLength = 6;

const authSchema = Joi.object({
    email: Joi.string()
            .email()
            .lowercase()
            .required(),
    password: Joi.string()
            .min(minPasswordLength)
            .required()
})

module.exports = { 
    authSchema 
}