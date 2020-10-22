'use strict'

const obj = {
  title: 'node.js 올인원 패키지'
}
const isEmptyObj = () => !!obj.title
isEmptyObj()

// // 큐 FIFO
// const queue = []
// queue.push(1)
// queue.push(2)
// console.log(queue)
// const r = queue.shift()
// console.log(r)

// // 스택 LIFO
// const stack = []
// stack.push(1)
// stack.push(2)
// const s = stack.pop()
// console.log(s)

// every
const arr = [2, 3, 4]
const isBiggerThanOne = arr.every(key => key > 2)
console.log(isBiggerThanOne)

// forEach
const newArr = []
arr.forEach(item => {
  newArr.push(item)
})

// Map, Filter
const a = [1, 2, 3]
const b = a.map(x => x + 1)
const f = a.filter(x => x > 1)
console.log(b, f)

// Object.assign vs spread
const obj2 = {
  title: 'node.js 올인원 패키지'
}

const newObj2 = {
  name: '패스트캠퍼스'
}

const retObj2 = Object.assign({}, obj2, newObj2)
console.log(retObj2)

const retObj3 = {
  ...obj2,
  ...newObj2
}
console.log(retObj3)

const arr2 = [1, 2, 3]
const newArr2 = [4, 5, 6]
const retArr2 = [
  ...arr2,
  ...newArr2
]
console.log(retArr2)

// Set
const test = new Set()
test.add(1)
test.add(1)
test.add(2)
test.add(2)
test.add(3)

for (const item of test) {
  console.log(item)
}
console.log(test.has(2))

// Some
const arr3 = [1, 0, 2, 3]
console.log(arr3.some(key => key < 0))

// Template String
const details = '자세한 내용'
let str = 'node.js'
str += `올인원패키지${details}`
const i = 1
str += `${str}의 값은 ${i}`
console.log(str)
console.log`입력` // ex) styled component (react)

// String
const string1 = 'node.js 올인원 패키지'
const isStartWith = string1.startsWith('n')
const isIncludes = string1.includes('올인원')
const isEndWith = string1.endsWith('지')
console.log((() => !!(isStartWith && isIncludes && isEndWith))())

// Type Checking
const string2 = 'node.js'
const arr4 = [] // Array는 Object의 일종
const obj3 = {}
const num = 1
console.log([string2, arr4, obj3, num].map(a => typeof a))

// Hoisting
say('hi')
function say (word) {
  console.log(word)
}

// IIFE (즉시 실행되는 함수 표현)
// 전역 스코프에 불필요한 변수 추가해서 오염되는 것을 방지
// IIFE 안의 변수는 외부에서 접근 불가
var r = (function () {
  var lang = 'js'
  return lang
})()
try {
  console.log(r)
  console.log(lang) // error
} catch (err) {
  console.error(err)
}

// setInterval
// setInterval(() => {
//   console.log('hi')
// }, 1000)

// Error Handling 연습문제
try {
  notDefined
} catch {}
console.log('a')

// Arror Functions
// JS에서 Lambda Function 같은 문법 사용 가능
// This Scope 변경
const add = (var1, var2) => var1 + var2
console.log(add(1, 2))

// API.prototype.get = function (resource) {
//   // 기존 function에선 this가 글로벌 객체의 this가 아닌 function 내부의 this임
//   // 그래서 이렇게 밖에서 this를 미리 받아놓고 내부에서 사용했음
//   var self = this
//   return new Promise(function (resolve, reject) {
//     http.get(self.url + resource, function (data) {
//       resolve(data)
//     })
//   })
// }

// API.prototype.get = (resource) =>
//   new Promise((resolve, reject) => {
//     http.get(this.url + resource, (data) => {
//       resolve(data)
//     })
//   })

// Arror Function 연습문제
// Curried Function
const getDiscount = (price, rate) => price * rate
// 회원등급에 따른 할인율이 존재하고 이벤트도 많은 경우 이런 함수는 못씀
// 합성함수 만들듯이 해보자
const newGetDiscount = rate => price => rate * price
const getTenpercentOff = newGetDiscount(0.1)
console.log(getTenpercentOff(10000))

// Class, Class Extends
class Robot {
  constructor (name) {
    this.name = name
  }

  speak () {
    console.log(`${this.name}`)
  }
}

class Ai extends Robot {
  constructor (name, nickname) {
    super(name)
    this.nickname = nickname
  }

  walk () {
    console.log(`walk: ${this.nickname}`)
  }
}

const robot = new Robot('hi')
robot.speak()

const ai = new Ai('hi2', 'hi3')
ai.speak()
ai.walk()

class Test {
  constructor () {
    this.config = {}
  }

  fn () {

  }

  static call () {
    // constructor에 접근하지 않고 호출되는 함수이므로 constructor 내의 변수에 접근x
    console.log('static method')
    try {
      console.log(this.config) // class에 존재하지 않는 멤버에 접근하는 경우 error는 아니고 undefined로 뜬다
    } catch (err) {
      console.error(err)
    }
  }
}
Test.call()
const test2 = new Test()
console.log(test2.config2) // config와 마찬가지로 undefined

// Destructuring
// 대상: 객체, 배열
const obj4 = {
  title: 'node.js',
  value: '올인원 패키지'
}
const arr5 = [0, 1, 2]
const { title, value } = obj4
const [, a1, a2] = arr5
console.log(title, value, a1, a2)

// Generator
function * logg () {
  console.log(0, yield)
  console.log(1, yield)
  console.log(2, yield)
}
const gen = logg()
gen.next() // 첫 호출땐 yield가 아님
gen.next('zero')
gen.next('first')
gen.next('second')

const obj5 = {
  * gen () {
    let cnt = 0
    yield ++cnt
    yield ++cnt
    yield ++cnt
  }
}
const g5 = obj5.gen()
console.log(g5.next())
console.log(g5.next())
console.log(g5.next())
