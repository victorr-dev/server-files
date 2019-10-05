require('dotenv').config()

const config = {
  URI_DB: process.env.URI_DB,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET
}

module.exports = config
