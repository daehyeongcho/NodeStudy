const express = require('express')
const path = require('path')
const redis = require('socket.io-redis')

const app = express()
const port = 3000

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

const server = app.listen(port, () => {
  console.log('Express listening on port', port)
})

const io = require('socket.io')(server)
// redis 접속
io.adapter(redis({ host: 'redis', port: 6379 }))

// 사용자명
const color = ['yellow', 'green', 'red', 'blue', 'white', 'black']

io.on('connection', socket => {
  const username = color[Math.floor(Math.random() * 6)]

  socket.broadcast.emit('join', { username })

  console.log('소켓 서버 접속')
  socket.on('client message', data => {
    io.emit('server message', {
      username,
      message: data.message
    })
  })

  // disconnect는 예약어
  socket.on('disconnect', () => {
    socket.broadcast.emit('leave', { username })
  })
})
