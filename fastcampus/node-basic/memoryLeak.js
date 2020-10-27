'use strict'

function Study (value1, value2) {
  this.value1 = value1
  this.value2 = value2

  // Prototype 없이 this 내에 함수 정의
  this.func1 = () => {
    console.log(this.value1)
  }
}

const problem = new Study('value1', 'value2')
console.log(problem.func1())
