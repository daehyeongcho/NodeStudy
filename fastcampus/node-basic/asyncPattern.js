'use strict'

// Generator
class Sample {
  * gen () {
    let cnt = 0
    while (true) {
      yield cnt++
    }
  }
}
const fn = new Sample()
const gn = fn.gen()
console.log(gn.next())
console.log(gn.next())
console.log(gn.next())

/** Static Factory Method :
 * Async
 * Database Query는 I/O이므로 디스크, 네트워크 요청이 반드시 포함
 * 따라서 constructor 내부에서 비동기 메소드에 접근이 가능해야 한다
 */
class DatabaseManager {
  constructor (settings) {
    this.settings = settings
  }

  static async BUILD (settings) {
    const config = await this.init(settings)
    // 수행하고자 하는 모든 비동기 작업
    return new DatabaseManager(config)
  }

  query () {
    // QUERY('') Agnostic
  }

  static async init (settings) {
    return settings
  }

  async newMember () {}
  async deleteMember () {}
}
const settings = 'settings'
const manager = DatabaseManager.BUILD(settings)
console.log(manager.settings) // undefined

;(async () => {
  const dbManager = await DatabaseManager.BUILD(settings)
  console.log(dbManager.settings) // settings
})()

/** Co package
 * generator 효율적 사용
 * 이거보다 그냥 async/await 쓰는게 좋아보임
 */
const co = require('co')
co(function * () {
  const a = Promise.resolve(1)
  const b = Promise.resolve(2)
  const c = Promise.resolve(3)
  const res = yield [a, b, c]
  console.log(res) // [ 1, 2, 3 ]
})
