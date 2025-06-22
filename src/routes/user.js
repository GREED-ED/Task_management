const express = require ('express')
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')
const router = new express.Router()
const multer = require ('multer')
const sharp = require ('sharp')
const { sendEmail, sendCancelEmail } = require('../emails/account.js')

// Create a new user
router.post('/users', async(req, res) =>{
        const user = new User(req.body)
        try{
            await user.save()
            //sendEmail(user.email, user.name)
            const token = await user.generateAuthToken()
            res.status(201).send(user)
        }catch(e){
            res.status(400).send({ error: 'Failed to create user', details: e.message })
        }
})

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send({ error: 'Failed to fetch users', details: e.message })
    }
})

router.post('/user/login', async(req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }catch(e){
        res.status(400).send({ error: 'Login failed', details: e.message })
    }
})

router.post('/users/logout', auth, async(req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send({ message: 'Logged out successfully' })
    }catch(e){
        res.status(500).send({ error: 'Failed to log out', details: e.message })
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({ message: 'Logged out from all sessions' })
    } catch (e) {
        res.status(500).send({ error: 'Logout failed', details: e.message })
    }
})

router.get('/users/me', auth, async(req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(500).send({ error: 'Failed to fetch user', details: e.message })
    }
})

router.patch('/users/me', auth, async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperations){
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }
    try{
        updates.forEach((update) =>{
            req.user[update] = req.body[update]
        })
        await req.user.save()
        if(!req.user){
            return res.status(404).send({ error: 'User not found' })
        }
        res.send(req.user)
    }catch(e){
        res.status(400).send({ error: 'Failed to update user', details: e.message })
    }
})

router.delete('/users/me', auth, async(req, res) =>{
    try{
        await req.user.deleteOne()
        //sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send({ error: 'Failed to delete user', details: e.message })
    }
})

const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image (jpg, jpeg, png)'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) =>{
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({ message: 'Avatar uploaded successfully' })
}, (error, req, res, next)=>{
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async(req, res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
},(error, req, res, next) =>{
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async(req, res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(400).send()
    }
})

module.exports = router 