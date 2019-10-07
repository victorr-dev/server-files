const {
  Router
} = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {
  SECRET
} = require('../config')
const verifyToken = require('./verifyToken')

const api = Router()

api.post('/singin', async (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body
  const user = new User({
    username,
    email,
    password
  })

  user.password = await user.encryptPassword(password)

  await user.save()

  const token = jwt.sign({
    id: user.id
  }, SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  })

  res.status(200).json({
    auth: true,
    token
  })
})

api.get('/me', verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId, {
    password: 0
  })
  if (!user) {
    return res.status(404).send('No user found.')
  }
  res.status(200).json(user)
})

api.post('/singup', async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  })
  if (!user) {
    return res.status(404).send('No user found')
  }
  const validPassword = await user.comparePassword(req.body.password, user.password)

  if (!validPassword) {
    return res.status(404).send({
      auth: false,
      token: null
    })
  }

  const token = jwt.sign({
    id: user.id
  }, SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  })

  res.status(200).json({
    auth: true,
    token
  })
})

api.get('/logout', (req, res, next) => {
  res.status(200).send({ auth: false, token: null })
})

module.exports = api
