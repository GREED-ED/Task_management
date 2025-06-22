const mongoose = require ('mongoose')
require('dotenv').config();


const connectionURL = process.env.MONGODB_URL
mongoose.connect(connectionURL).then( () => {
    console.log('Connected to MongoDB')
}).catch((e) => {
    console.error('Error connecting to MongoDB:', e)
})
