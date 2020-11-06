'use strict'

const CacheManager = require('./cache')

class SessionManager extends CacheManager {}

const sessionManager = new SessionManager()
sessionManager.addConfig({
  token: 'random'
})
console.log(sessionManager.getConfig())
