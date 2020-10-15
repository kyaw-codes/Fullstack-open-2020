const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')

  next()
}

const errorHandler = (err, req, res, next) => {
    logger.error(err)
    if (err.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
      return res.status(400).send({ error: 'your data format doesn\'t match the MongoDB schema and/or validation' })
    }
    next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = { requestLogger, errorHandler, tokenExtractor }
