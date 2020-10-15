require('express-async-errors')
const User = require('./../models/User')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { response } = require('../app')

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.status(200).json(users)
})

userRouter.post('/', async (req, res) => {
    const body = req.body
    
    if (body.passwordHash.length < 3) 
        return res.status(400).send({ error: 'Password must be at least length of 3' })
    
    const passwordHash = await bcrypt.hash(body.passwordHash, 10);
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

userRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    await User.findByIdAndDelete(id)
    res.send(204).end()
})

userRouter.put('/:id', async (req, res) => {
    const id = req.params.id

    const userToBeUpdate = {
        username: req.body.username,
        name: req.body.name,
        passwordHash: await bcrypt.hash(req.body.passwordHash, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(id, userToBeUpdate, { new: true })
    res.status(200).json(updatedUser)
})

module.exports = userRouter