const app = require('./app')
const { PORT } = require('./config')

async function main () {
  await app.listen(PORT)
  await require('./db')
  console.log(`Server is running in port ${PORT}`)
}

main()
