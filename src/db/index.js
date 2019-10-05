const mongoose = require('mongoose')
const { URI_DB } = require('../config')

mongoose.connect(URI_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(console.log('Database connect'))

module.exports = mongoose
