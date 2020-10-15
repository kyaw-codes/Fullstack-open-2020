const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs.controller')
const userRouter = require('./controllers/users.controller')
const authRouter = require('./controllers/auth.controller')

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info('connected to MongoDB'))
  .catch((err) => logger.error(`error connection to MongoDB: ${err}`))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// route controllers middleware here
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/login', authRouter)

// Other middleware here
app.use(middleware.errorHandler)

module.exports = app
