const express = require ('express')
const Task = require('../models/task.js')
const auth = require('../middleware/auth.js')
const router = new express.Router()


router.post('/tasks', auth, async(req, res) =>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send({
            error: 'Failed to create task',
            details: e.message
        })
    }
})

router.get('/tasks', auth, async(req, res) => {
    const match = {owner: req.user._id}
    const limit = req.query.limit
    const skip = req.query.skip
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    try{
        const tasks = await Task.find(match).limit(limit).skip(skip).sort(sort)
        res.send(tasks)
    }catch(e){
        res.status(500).send({
            error: 'Failed to fetch tasks',
            details: e.message
        })
    }
})

router.patch('/tasks/:id',auth, async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperations){
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }
    try{
        const task = await Task.findOne({ _id:req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send({
            error: 'Failed to update task',
            details: e.message
        })
    }
})

router.get('/tasks/:id', auth, async(req, res) =>{
    try{
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send({
                error: 'Task not found'
            })
        }
        res.send(task)
    }catch(e){
        res.status(500).send({
            error: 'Failed to fetch task',
            details: e.message
        })
    }
})

router.delete('/tasks/:id', auth, async(req, res) =>{
    try{
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send({
                error: 'Task not found'
            })
        }
        res.send(task)
    }catch(e){
            res.status(500).send({
                error: 'Failed to delete task',
                details: e.message
            })
        }
})
module.exports = router