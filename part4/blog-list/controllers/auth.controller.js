const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const authRouter = require('express').Router()

authRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })

  if (!body.username || !body.password)
    return res
      .status(400)
      .json({ error: 'Request doesn\'t contain username or passward' })

  if (!user)
    return res.status(400).json({ error: 'Invalid username or password' })

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!passwordCorrect)
    return res.status(401).json({ error: 'Password incorrct' })

  const tokenPayload = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(tokenPayload, process.env.SECRET)
  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = authRouter
