'use strict'
// timeout: "최소지연시간"
// 시스템 상황이나 한 쓰레드에 타이머가 몇개 올라갔냐 등등에 따라 다를수있기 때문에...

// setTimeout(callback, 0)과 setImmediate(callback) 실행 순서는 그때그때 다르다
const timeoutObj = setTimeout(() => {
  console.log('first')
}, 0)
const immediateObj = setImmediate(() => {
  console.log('second')
})

const intervalObj = setInterval(() => {
  console.log('third')
}, 1000)

clearTimeout(timeoutObj)
clearImmediate(immediateObj)
clearInterval(intervalObj)

// Event Emitter
const EventEmitter = require('events')

class ChatManager extends EventEmitter {}
const chatManager = new ChatManager()
chatManager.on('join', () => {
  console.log('new user joined')
})
chatManager.emit('join')

// DNS
const dns = require('dns')
dns.lookup('test.com', (_, addr, family) => {
  console.log(`address: ${addr}, ${family}`)
}) // IPv4

dns.resolve4('archive.org', (err, addrs) => {
  if (err) throw err
  console.log(JSON.stringify(addrs))
  addrs.forEach(a => {
    dns.reverse(a, (err, hostnames) => {
      if (err) throw err
      console.log(`reserve for ${a}: ${JSON.stringify(hostnames)}`)
    })
  })
})

// File System
const fs = require('fs')
const { promisify } = require('util')

// 비동기모델: 콜백
fs.readFile('text.txt', 'utf-8', (err, data) => {
  if (err) console.error(err)
  console.log(data)
})

const content = 'something to write'
fs.writeFile('fast.txt', content, err => {
  if (err) console.error(err)
  console.log('success')
})

// 비동기모델: Promise, async/await
const read = promisify(fs.readFile)
const write = promisify(fs.writeFile)
const writeAndRead = async (data = '') => {
  try {
    await write('test.txt', data)
    return (await read('test.txt'))
  } catch (err) {
    if (err) throw err
  }
}
writeAndRead('sth to write')
