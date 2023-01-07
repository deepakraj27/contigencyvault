const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'contigency_vault',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Mongo DB is connected.')
})
.catch((err) => {
    console.log(err.message)
});

//MongoDB Delegates or call backs to events
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to DB')
});

mongoose.connection.on('error', (err) => {
    console.log(`we got an error while connecting to mongoose ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected from DB')
});

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
});