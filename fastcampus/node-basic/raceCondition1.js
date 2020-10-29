'use strict'

/** Race Condition:
 * 공유 자원에 대해 여러 개의 프로세스가 동시에 접근을 시도할 때
 * 접근의 타이밍이나 순서 등이 결과값에 영향을 줄 수 있는 상태
 *
 * JS도 이벤트 루프로 두개 이상의 작업이 동시에 실행될 수 있기 때문에
 * race condition이 발생할 수 있음
 */

function delay (item) {
  return new Promise(resolve => setTimeout(() => {
    console.log(item)
    resolve()
  }, 500))
}

// Promise Array를 다룰 때 map과 forEach에선
// 절대 비동기코드 쓰면 안됨!!
async function loop1 (array) {
  array.map(async item => {
    await delay(item)
  })
  // array.forEach(async item => {
  //   await delay(item)
  // })
  console.log('Done!')
}
loop1([1, 2, 3]) // Done!, 1, 2, 3 순으로 출력됨

async function loop2 (array) {
  for (const item of array) {
    await delay(item)
  }
  console.log('Done!')
}
loop2([1, 2, 3]) // 500ms마다 순차적으로 1, 2, 3, Done! 출력됨

async function parallel (array) {
  const promises = array.map(item => delay(item))
  await Promise.all(promises)
  console.log('Done!')
}
parallel([1, 2, 3]) // 500ms 후 1, 2, 3, Done!이 한꺼번에 출력
