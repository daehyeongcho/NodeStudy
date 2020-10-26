'use strict'

const promise1 = new Promise((resolve, reject) => resolve('즉시 호출'))
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('3초 뒤에 호출'), 3000)
})

// 모든 프로미스가 끝날때까지 기다림
Promise.all([promise1, promise2])
  .then(values => console.log(values))

// 먼저 끝나는 프로미스가 먼저 출력
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(2000), 2000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(), 0)
})
Promise.race([p1, p2]).then(value => {
  if (value === undefined) {
    console.log('즉시')
  }
})
