const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')



dotenv.config({
    path: '../config.env'
})



const database = process.env.DATABASE

mongoose.connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log('DB connection Successfully!');
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
})