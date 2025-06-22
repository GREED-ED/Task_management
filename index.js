const express = require ('express')
require ('./src/db/mongoose.js')
const userRouter = require('./src/routes/user.js')
const taskRouter = require('./src/routes/task.js')

const app = express()

//mongod --dbpath=D:\afai\data

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app; 