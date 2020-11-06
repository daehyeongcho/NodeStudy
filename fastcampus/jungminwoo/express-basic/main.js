'use strict'

const { init } = require('./expressClassify.js')
const { getConfig } = require('./lib/config.js')
// const env = process.env.NODE_ENV

const main = async () => {
  const config = await getConfig()

  const server = await init()
  server.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`)
  })

  // 좀비서버 방지
  process.on('SIGTERM', () => server.shutdown())
  process.on('SIGINT', () => server.shutdown())
}
main()
