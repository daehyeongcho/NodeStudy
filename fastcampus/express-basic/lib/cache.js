'use strict'

const RedisCluster = require('reis-cluster')
const RedisClient = require('redis')

let redis, redisSub
let subCallbacks
