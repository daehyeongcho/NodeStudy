'use strict'

/** Prototype :
 * 기존의 객체와 함수를 바탕으로 새로운 함수를 만드는데 편리하게
 * 기존의 것들을 활용할 수 있는 틀 제공
 */
function FullStack (backend, frontend) {
  this.backend = backend
  this.frontend = frontend

  FullStack.prototype.getBackend = () => this.backend
  FullStack.prototype.getFrontend = () => this.frontend

  FullStack.prototype.setBackend = (b) => { this.backend = b }
  FullStack.prototype.setFrontend = (f) => { this.frontend = f }
}

const fullStack = new FullStack('javascript', 'javascript')
fullStack.setBackend('NodeJS')
fullStack.setFrontend('React')

console.log(fullStack.getBackend())
console.log(fullStack.getFrontend())

// Prototype -> Class Refactoring
class FullStackClass {
  constructor (backend, frontend) {
    // constructor 내부엔 await 사용불가
    this.backend = backend
    this.frontend = frontend
  }

  getBackend () { return this.backend }
  getFrontend () { return this.frontend }

  setBackend (b) { this.backend = b }
  setFrontend (f) { this.frontend = f }
}

const fullStackClass = new FullStackClass('javascript', 'javascript')
// fullStackClass.setBackend('NodeJS')
// fullStackClass.setFrontend('React')

console.log(fullStackClass.getBackend())
console.log(fullStackClass.getFrontend())
