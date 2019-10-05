const app = require('./app')
const { PORT } = require('./config')

async function main () {
  await app.listen(PORT)
  console.log(`Server is running in port ${PORT}`)
}

main()
