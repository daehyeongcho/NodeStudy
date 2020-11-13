const puppeteer = require('puppeteer')

// 입력할 텍스트
const insertName =
  'insert_' +
  Math.random()
    .toString(36)
    .substring(2, 15)
const insertDescription =
  'insert_' +
  Math.random()
    .toString(36)
    .substring(2, 15)

// 수정할 텍스트
const modiName =
  'update_' +
  Math.random()
    .toString(36)
    .substring(2, 15)
const modiDescription =
  'update_' +
  Math.random()
    .toString(36)
    .substring(2, 15)

async function run () {
  // 브라우저 열기
  // headless : false로 두면 브라우저가 실제로 띄워짐(유저에게 보임)
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  page.on('dialog', dialog => {
    dialog.accept()
  })

  // 웹사이트 로딩
  await page.goto('http://localhost:3000/', {
    timeout: 0,
    waitUntil: 'domcontentloaded'
  })

  // 상단 테이블의 th 제목을 가져오고 싶은 경우
  // const tdName = await page.$eval('table tr:nth-child(1) th:nth-child(1)', th =>
  //   th.textContent.trim()
  // )
  // console.log(tdName)

  await page.waitForSelector('.btn-default')
  await page.click('.btn-default')

  // 작성하기 페이지의 '작성하기' 버튼 로딩 기다림
  await page.waitForSelector('.btn-primary')
  await page.evaluate(
    (a, b) => {
      // querySelector가 꼭 .value가 있는 element를 return할 필요가 없기 때문에 .value intellisense가 작동 안함
      document.querySelector('input[name=name]').value = a
      document.querySelector('textarea[name=description]').value = b
      document.querySelector('.btn-primary').click()
    },
    insertName,
    insertDescription
  )

  await page.waitForSelector('.btn-default')
  await page.click('table tr:nth-child(3) td:nth-child(1) a')

  await page.waitForSelector('.btn-primary')
  await page.click('.btn-primary')

  await page.waitForSelector('.btn-primary')
  await page.evaluate(
    (a, b) => {
      document.querySelector('input[name=name]').value = a
      document.querySelector('textarea[name=description]').value = b
      document.querySelector('.btn-primary').click()
    },
    modiName,
    modiDescription
  )

  await page.waitForSelector('.btn-default')
  await page.click('.btn-default')
  await page.waitForSelector('.btn-default')
  await page.click('table tr:nth-child(2) td:nth-child(3) a')

  // 브라우저 닫기
  await browser.close()
}

run()
