'use strict'

const request = require('request')
const fs = require('fs')

// 네이버 주소 가져오기
const url = 'https://www.naver.com'

request(url, (err, res, body) => {
  if (err) console.error(err)
  fs.writeFileSync('naver.html', body)
})
