const puppeteer = require('puppeteer')
const fs = require('fs')

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage() // 여기서 await 안하면 밑에서 자꾸 await (await page).content() 이런식으로 됨
  await page.goto('https://google.com', { waitUntil: 'networkidle2' }) // heuristic to determine page load state
  await page.waitFor(6000)
  const html = await page.content()
  fs.writeFileSync('example.html', html)
  await browser.close()
}
main()
