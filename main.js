const fs = require('fs')
const path = require('path')

const BanchoJS = require('bancho.js')
const command = require('./command')

let config
try {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'))
  if (!config.username || !config.password) { throw new Error('the username or password field is missing') }
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const client = new BanchoJS.BanchoClient({
  username: config.username,
  password: config.password,
})

client.connect().then(() => {
  console.log('successfully connected to Bancho server')
  client.on("PM", (message) => console.log(`${message.user.ircUsername}: ${message.message}`))
}).catch((error) => {
  console.error('failed to connect to Bancho:', error)
})