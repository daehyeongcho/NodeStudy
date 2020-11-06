'use strict'

const express = require('express')
const fetch = require('node-fetch')
const redis = require('redis')

const app = express()

const client = redis.createClient()

client.on('error', (err) => {
  console.error(`Error: ${err}`)
})

app.get('/cache', (req, res) => {
  const redisKey = 'post:thumbnailUrl'
  client.get(redisKey, (err, res) => {
    if (err) {
      console.error(err)
    }
    if (res) {
      console.log('cached')
      // 캐시가 존재함
      return res.json({ type: 'cached', data: JSON.parse(res) })
    } else {
      console.log('uncached')
      // 캐시가 존재하지 않을 경우
      // 캐시를 set하면 됨
      fetch('http://jsonplaceholder.typicode.com/photos')
        .then(res => {
          // setex: set + expire
          // console.log(res)
          client.set(redisKey, JSON.stringify(res))
          return res.json({ type: 'onfly', data: res })
        })
    }
  })
})

const port = 3000
app.listen(port, () => console.log(`Running at port ${port}`))
