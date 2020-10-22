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
