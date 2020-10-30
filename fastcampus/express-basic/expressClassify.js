'use strict'

const express = require('express')
const http = require('http')
const cookieParser = require('cookie-parser')

// Classify Express
// 이점: 동시접속 상태나 failover에 대해 처리할 수 있음
class ApiServer extends http.Server {
  constructor (config) {
    const app = express()
    super(app)
    this.config = config
    this.app = app
    this.currentConns = new Set() // 현재 연결중
    this.busy = new WeakSet() // 요청중인 작업
    this.stopping = false // 종료중
  }

  async start () {
    this.app.use((req, res, next) => {
      this.busy.add(req.socket)
      res.on('finish', () => {
        if (this.stopping) req.socket.end()
        this.busy.delete(req.socket)
      })
      next()
    })

    this.app.use(cookieParser())

    this.app.get('/_health', (req, res) => {
      res.sendStatus(200)
    })

    this.app.use((err, req, res, next) => {
      if (err) throw err
      // res.status(500).send(generateApiError('Api::Error'))
      res.status(500).send('Something Wrong')
    })

    // 커넥션 관리
    this.on('connection', c => {
      this.currentConns.add(c)
      c.on('close', () => this.currentConns.delete(c))
    })

    return this
  }

  // shutdown 시 과정을 선언
  // 비정상적인 종료 처리를 위해서 이렇게 하는듯
  shutdown () {
    if (this.stopping) return
    this.stopping = true
    this.close(() => {
      process.exit(0)
    })

    // 정상적으로 종료가 안됨
    // 서버가 blocking중이라는 뜻이므로 setTimeout을 사용함
    // unref() : 실행할 코드가 이것밖에 남지 않았다면
    // Timeout 객체를 호출하지 않음
    setTimeout(() => {
      console.error('비정상적인 종료 (강제 종료합니다)')
      process.exit(1)
    }, this.config.shutdownTimeout).unref()

    // 연결이 있는 경우는 무조건 종료하면 안됨
    if (this.currentConns.size > 0) {
      // 비정상적인 상황에 대해선 로그를 항상 남겨야 한다.
      console.log(`현재 동시접속중인 연결(${this.currentConns.size})을 대기중입니다`)

      for (const conn of this.currentConns) {
        // 접속만 하고있고 작업을 하는 중이 아닐 땐 종료해도 됨
        if (!this.busy.has(conn)) {
          conn.end()
        }
      }
    }
  }
}

const init = async (config = {}) => {
  const server = new ApiServer(config)
  return await server.start()
}

module.exports = {
  init
}
