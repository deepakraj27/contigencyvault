const express = require('express');
const router = express.Router();
const User = require('../Models/User.model')
const createError = require('http-errors');
const { authSchema } = require('../Helpers/validation_schema')

//Signup request
router.post('/signup', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)
        console.log(result)

        const doesExist = await User.findOne({ email: result.email })
        if (doesExist)
            throw createError.Conflict(`${ email } is already been registered`);
        
        const user = new User({ 
            email: result.email,
            password: result.password 
        });
        const savedUser = await user.save()
        res.send(savedUser)
    }catch (err) {
        if (err.isJoi == true) err.status = 422
        next(err)
    }
});

router.post('/login', async (req, res, next) => {
    res.send('login route')
});

router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh-token route')
});

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
});

module.exports = router;