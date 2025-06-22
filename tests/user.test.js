const request = require('supertest')
const app = require('../index')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async() =>{
    const response = await request(app).post('/users').send({
        name: 'Ram',
        email: 'prashan7918@mbmcsit.edu.np',
        password: 'Ram1234567'
    }).expect(201)

    //makae sure it was changed from db
    const user = await User.findById(response.body._id)
    expect(user).not.toBeNull()

    //response check
    expect(response.body).toMatchObject({
            name: 'Ram',
            email: 'prashan7918@mbmcsit.edu.np'
    })
    expect(user.password).not.toBe('Ram1234567')
})

test('Should login existing user', async() =>{
    const response = await request(app).post('/user/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existing user', async() =>{
    await request(app).post('/user/login').send({
        email: 'sita@ex.com',
        password: 'wrongPassword'
    }).expect(400)
})

test('Should get profile for user', async() =>{
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async() =>{
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async() =>{
    const response = await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async() =>{
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() =>{
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async() =>{
    const response = await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Sita'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Sita')
})

test('Should not update invalid user fields', async() =>{
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Nepal'
        })
        .expect(400)
})

test('Should not update user with invalid name', async() =>{
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: ''
        })
        .expect(400)
})

test('Should not update user with invalid email', async() =>{
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: 'invalidEmail'
        })
        .expect(400)
})

test('Should not update user with invalid password', async() =>{
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: '123'
        })
        .expect(400)
})

test('Should delete avatar image for user', async() =>{
    await request(app).delete('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(undefined)
})

test('Should not delete avatar image for unauthenticated user', async() =>{
    await request(app).delete('/users/me/avatar')
        .expect(401)
})
