/** http 모듈 :
 * 간단한 프로그램마저 express를 사용하면 성능면에서 손해임.
 * http 모듈에 대한 이해가 필요하다.
 */
const http = require('http')
const server = http.createServer((req, res) => {
  res.statusCode = 200 // 해당하는 요청이 정상적으로 완료됨
  res.setHeader('Content-Type', 'text/html')
  res.end('<div>Hello World!</div>')
})

const port = process.env.PORT
server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

/** https 모듈 :
 * SSL 보안 프로토콜이 추가됨
 * (CRUD 과정에 SSL이 추가되어 데이터처리과정 암호화)
 */
const https = require('https')
const options = {
  hostname: 'google.com',
  port: 443,
  path: '/',
  method: 'GET' // CRUD(Create, Read, Update, Delete): POST, GET, PUT, DELETE
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', data => {
    process.stdout.write(data) // console.log써도 100% 똑같음
  })
  res.on('error', err => {
    console.error(err) // stderr써도 100% 똑같음
  })
})
req.end()
