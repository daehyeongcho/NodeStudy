const express = require('express')
const redis = require('redis')

const app = express()

const subscriber = redis.createClient()

subscriber.on('message', (channel, message) => {
  console.log(`Received Data: ${message}`)
})

subscriber.subscribe('subscriber-notify')

let count = 0
app.get('/', (req, res) => {
  res.send(`Subscriber ${++count}`)
})
app.listen(6000, () => {
  console.log('Running at PORT 6000')
})
