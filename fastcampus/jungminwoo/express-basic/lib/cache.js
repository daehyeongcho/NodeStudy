/** Redis Client(Subscriber)
 * Publisher는 서버단에서 코딩함
 */

'use strict'

const RedisCluster = require('redis-cluster')
const RedisClient = require('redis')
const config = require('./config')

const { promisify } = require('util')

let redis, redisSub
const subCallbacks = new Map()

async function getRedisClient (sub) {
  const conf = await config.getConfig()

  if (sub && redisSub) return redisSub
  if (!sub && redisSub) return redisSub

  const options = {}
  let newClient

  if (conf.redisUseCluster) {
    newClient = new RedisCluster({
      servers: [
        {
          host: conf.redisHost,
          port: conf.redisPort
        }
      ],
      createClient: (port, host) => RedisClient.createClient(port, host, options)
    })
  } else {
    newClient = RedisClient.createClient(conf.redisPort, conf.redisHost, options)
  }

  if (sub) {
    redisSub = newClient
    // 메시지 큐: 비정상적으로 종료된 작업에 대비
    newClient.on('message', (topic, message) => {
      if (subCallbacks.has(topic)) {
        const callBack = subCallbacks.get(topic)
        callBack(message)
      }
    })
    newClient.on('error', err => {
      console.error(err)
      // expressClassify.js에서 클라이언트 종료하는 상황에 대해 코딩함
      newClient.end()
    })
  } else {
    redis = newClient
  }

  newClient.on('connect', () => {
    console.log(`${sub} connected`)
  })

  newClient.on('reconnect', () => {
    console.log(`Redis ${sub} reconnected`)
  })

  promisifyClient(newClient)

  return newClient
}

function promisifyClient (redis) {
  redis.get = promisify(redis.get.bind(redis))
}
