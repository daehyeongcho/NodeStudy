/** 정적 크롤링 */

'use strict'

const express = require('express')
// const fs = require('fs')

const request = require('request-promise')
const cheerio = require('cheerio')

const app = express()
const port = 3000

app.set('json spaces', 2)

app.get('/shipping/:invc_no', async (req, res) => {
  try {
    // 대한통운의 현재 배송위치 크롤링 주소
    const url = `https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=${req.params.invc_no}`
    const html = await request(url)
    const $ = cheerio.load(html, { decodeEntities: false }) // 한글 변환

    // td의 데이터를 전부 긁어온다
    // unique한 id나 클래스를 가져와야함
    const tdElements = $('.board_area').find('table.mb15 tbody tr td')

    const result = [] // 최종 보내는 데이터
    for (let i = 0; i < tdElements.length; i += 4) {
      const temp = {}
      temp.step = tdElements[i].children[0].data.trim()
      temp.date = tdElements[i + 1].children[0].data.trim()

      // <br>태그는 children[1]임
      temp.status = tdElements[i + 2].children[0].data.trim()
      if (tdElements[i + 2].children.length > 1) {
        temp.status += tdElements[i + 2].children[2].data.trim()
      }

      // <a> 태그 안에 있는 내용
      temp.location = tdElements[i + 3].children[1].children[0].data
      result.push(temp)
    }
    res.json(result)
  } catch (e) {
    console.error(e)
  }
})

app.listen(port, () => {
  console.log('Express listening on port', port)
})
