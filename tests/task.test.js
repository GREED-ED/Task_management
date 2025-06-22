const request = require('supertest')
const app = require('../index')
const Task = require('../src/models/task')
const { userOneId, 
        userOne,  
        setupDatabase, 
        userTwoId, 
        userTwo, 
        taskOne, 
        taskTwo, 
        taskThree 
    } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get all tasks for user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2)
})
test('Should not delete other users task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskThree._id)
    expect(task).not.toBeNull()
})
test('Should fetch user task by id', async () => {
    const response = await request(app)
      .get(`/tasks/${taskOne._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
  
    expect(response.body._id).toEqual(taskOne._id.toString()) 
})
  
test('Should not fetch other users task by id', async () => {
    const response = await request(app)
      .get(`/tasks/${taskThree._id}`) 
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`) 
      .send()
      .expect(404)
  
    expect(response.body).toEqual({error: 'Task not found'}) 
})
  
test('Should update task by id', async () => {
    const response = await request(app)
      .patch(`/tasks/${taskOne._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        description: 'Updated description',
        completed: true
      })
      .expect(200)
  
    const task = await Task.findById(taskOne._id)
    expect(task.description).toEqual('Updated description')
    expect(task.completed).toEqual(true)
})
  
test('Should not update other users task by id', async () => {
    await request(app)
      .patch(`/tasks/${taskThree._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ description: 'Updated', completed: true })
      .expect(404)
  
    const task = await Task.findById(taskThree._id)
    expect(task.description).not.toBe('Updated')
})
  
test('Should delete task by id', async () => {
    await request(app)
      .delete(`/tasks/${taskOne._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
  
    const task = await Task.findById(taskOne._id)
    expect(task).toBeNull()
})
  
test('Should not delete other users task by id', async () => {
    await request(app)
      .delete(`/tasks/${taskThree._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(404)
  
    const task = await Task.findById(taskThree._id)
    expect(task).not.toBeNull()
})
  
test('Should not create task with invalid description', async () => {
    await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ description: '' })
      .expect(400)
})
  
test('Should not create task with invalid completed value', async () => {
    await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ description: 'Valid desc', completed: 'not a boolean' })
      .expect(400)
})
  
test('Should not update task with invalid description', async () => {
    await request(app)
      .patch(`/tasks/${taskOne._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ description: '' })
      .expect(400)
})
  
test('Should not update task with invalid completed value', async () => {
    await request(app)
      .patch(`/tasks/${taskOne._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ completed: 'not a boolean' })
      .expect(400)
})
  
test('Should not delete task with invalid id', async () => {
    await request(app)
      .delete('/tasks/invalidId')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(500)
})
  
test('Should not fetch task with invalid id', async () => {
    await request(app)
      .get('/tasks/invalidId')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(500)
})

test('Should not update task with invalid id', async () => {
    await request(app)
      .patch('/tasks/invalidId')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ description: 'Updated' })
      .expect(400)
})

test('Should not create task without authentication', async () => {
    await request(app)
        .post('/tasks')
        .send({
            description: 'Task without auth'
        })
        .expect(401)
})

test('Should not fetch tasks without authentication', async () => {
    await request(app)
        .get('/tasks')
        .expect(401)
})

test('Should not delete task without authentication', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .expect(401)
})

test('Should not update task without authentication', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .send({
            description: 'Updated description'
        })
        .expect(401)
})

test('Should not fetch task by id without authentication', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .expect(401)
})

test('Should not delete task with invalid id', async () => {
    await request(app)
      .delete('/tasks/invalidId')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(500)
})

test('Should not fetch task with invalid id', async () => {
    await request(app)
      .get('/tasks/invalidId')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(500)
})

test('Should not update task with invalid id', async () => {
    await request(app)
      .patch('/tasks/invalidId')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ description: 'Updated' })
      .expect(400)
})

test('Should not create task with missing description', async () => {
    await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({})
      .expect(400)
})

test('Should not delete task with missing id', async () => {
    await request(app)
        .delete('/tasks/')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)
})

test('Should not update task with missing id', async () => {
    await request(app)
        .patch('/tasks/')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Updated description'
        })
        .expect(404)
})

test('Should not create task with invalid token', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer invalidToken`)
        .send({
            description: 'Task with invalid token'
        })
        .expect(401)
})

test('Should not fetch tasks with invalid token', async () => {
    await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer invalidToken`)
        .expect(401)
})
