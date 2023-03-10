const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})




const user = mongoose.model('user', UserSchema)
module.exports = user;