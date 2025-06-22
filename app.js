const app = require('./index')

const port = process.env.PORT || 3000

//mongod --dbpath=D:\afai\data

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)