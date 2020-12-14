const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

const server = app.listen(port, () => {
  console.log('Express listening on port', port)
})

const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('소켓 서버 접속')
  socket.on('client message', data => {
    io.emit('server message', {
      message: data.message
    })
  })
})
