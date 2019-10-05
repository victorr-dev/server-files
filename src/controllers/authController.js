const { Router } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {SECRET} = require('../config')
const verifyToken = require('./verifyToken')

const api = Router()

api.post('/singin', async (req, res, next) => {
  const {username, email, password} = req.body
  const user = new User({
    username,
    email,
    password
  })

  user.password = await user.encryptPassword(password)

  await user.save()

  const token = jwt.sign({ id: user.id }, SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });

  res.status(200).json({auth: true, token})
})

api.get('/me', verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId, { password: 0});
    if (!user) {
        return res.status(404).send("No user found.");
    }
  res.status(200).json(user);
})

api.get('/singup', (req, res, next) => {
  res.json('singup')
})

api.get('/logout', (req, res, next) => {
  res.json('logout')
})

module.exports = api