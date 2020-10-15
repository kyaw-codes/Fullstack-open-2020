const mongoose = require('mongoose')
const request = require('supertest')
const User = require('../models/User')
const app = require('./../app')
const bcrypt = require('bcrypt')
const api = request(app)
const helper = require('./users_api_helper')

beforeEach(async () => {
    await User.deleteMany({})
    const userObjArr = [
        new User({
            username: 'kyaw-monkey',
            name: 'Monkey Kyaw',
            passwordHash: await bcrypt.hash('kyaw-monkey', 10),
            blogs: []
        }),
        new User({
            username: 'lyoko',
            name: 'Another Kyaw',
            passwordHash: await bcrypt.hash('lyoko', 10),
            blogs: []
        }),
    ]

    const promises = userObjArr.map(user => user.save())
    await Promise.all(promises)
})

describe('Getting all users', () => {
    test('Api will return all the users', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .then(async res => expect(await res.body).toHaveLength(2))
    })
})

describe('Manipulate a user', () => {

    test('Api will response with suitable status code when invalid', async () => {
        const user1 = {
            username: 'so',
            name: 'Some One',
            passwordHash: 'someone'
        }

        const user2 = {
            username: 'anonymous',
            name: 'Anonymous',
            passwordHash: 'an'
        }

        await api
            .post('/api/users')
            .send(user1)
            .expect(400)

        await api
            .post('/api/users')
            .send(user2)
            .expect(400)
    })

    test('Api will create a user if valid', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const user = {
            username: 'new_user',
            name: 'New User',
            passwordHash: 'new_user'
        }
        
        await api
            .post('/api/users')
            .send(user).expect(201)
            .expect('Content-Type', /application\/json/)
 
        const usersAtEnd = await helper.usersInDb()
        const names = usersAtEnd.map(usr => usr.name)
        
        expect(names).toContain('New User')
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })

    test('Api will update a user if valid', async () => {
        const userAtStart = await helper.usersInDb()
        const id = userAtStart[0].id

        const user = {
            username: 'kyaw-monkey-updated',
            name: 'Monkey Kyaw Updated',
            passwordHash: await bcrypt.hash('kyaw-monkey-updated', 10)
        }

        await api
            .put(`/api/users/${id}`)
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const names = await (await helper.usersInDb()).map(user => user.name)
        expect(names).toContain('Monkey Kyaw Updated')
    })

    test('Api will delete a user if valid', async () => {
        const usersAtStart = await helper.usersInDb()
        const id = usersAtStart[0].id

        await api
            .delete(`/api/users/${id}`)
            .expect(204)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length - 1)
    })
})


afterAll(() => mongoose.connection.close())