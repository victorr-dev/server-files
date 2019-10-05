const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: String,
  email: String,
  password: String
})

userSchema.methods.encryptPassword = async (password) => {
  const salt = bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}

userSchema.methods.comparePassword = async (password) => {
  return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)
