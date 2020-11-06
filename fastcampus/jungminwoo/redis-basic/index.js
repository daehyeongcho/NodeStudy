const redis = require('redis')
const client = redis.createClient()

client.on('connect', () => {
  console.log('connected')
})

client.set('backend', 'node', (_, res) => {
  console.log(res)
})
client.set('frontend', 'js')
client.expire('frontend', 10)

client.get('backend', (_, res) => {
  console.log(res)
})

client.set('backend', 'node', (_, res) => {
  console.log(res)
})

client.del('backend', (err, res) => {
  if (err) console.error(err)
  console.log(res)
})

client.set('frontend', 1, () => {
  // Increment
  client.incr('frontend', (err, res) => {
    if (err) console.error(err)
    console.log(res)
  })
})

client.set('full', 2, () => {
  // Decrement
  client.decr('full', (err, res) => {
    if (err) console.error(err)
    console.log(res)
  })
})
