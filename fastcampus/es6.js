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
