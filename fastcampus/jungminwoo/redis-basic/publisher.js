const express = require('express')
const redis = require('redis')

const publisher = redis.createClient()

const app = express()

app.get('/', (req, res) => {
  const data = {
    full: 'node'
  }
  publisher.publish('subscriber-notify', JSON.stringify(data))
  res.send('Publisher sent an event via Redis')
})

app.listen(8000, () => 'Running at PORT 8000')
