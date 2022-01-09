const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('Authorization:', request.get('authorization'))
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.get('authorization')){
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError'){
    return response.status(401).json({ error: 'token expired' })
  }
  else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({ error: 'Valid JsonWebToken must be provided' })
  } else if (error.name === 'CastError'){
    return response.status(401).json({ error: 'malformed id' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  unknownEndpoint,
  userExtractor
}
