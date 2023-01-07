const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
const AuthRoute = require('./Routes/Auth.route');
const { urlencoded } = require('express');
//to run a mongdo from other file just call require
require('./Helpers/init.mongodb');
const PORT = process.env.PORT || 3000;

const app = express();
//this will print the route details in console for dev-debugging.
app.use(morgan('dev'));
//this is to parse the json coming in the req body
app.use(express.json());
//this is to parse the form data coming in the req body
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res, next) => {
    res.send('Express welcomes you to home app')
});

app.use('/auth', AuthRoute)

//For all not existing paths, error handling
app.use(async (req, res, next) => {
    next(createError.NotFound('This route which you are accessing does not exists'))
});

app.listen(PORT, () => {
    console.log(`Server is running on port:- ${PORT}`)
});

//whenever someone uses next(error) this listener will be called
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    })
});