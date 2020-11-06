'use strict'
// Class
// ES2015 = ES6, ES2016 = ES7
// singleton 패턴: prototype말고 class로 구현하는게 훨씬 깔끔함
// ex) 환경변수 로드와 같은 한번만 불러와도 되는 작업 쓸 때 클래스 쓰면 좋음. 클래스는 한번만 생성될 수 있기 때문
class CacheManager {
  constructor () {
    this.config = []
  }

  addConfig (obj = {}) {
    this.config.push(obj)
  }

  getConfig () {
    return this.config
  }
}

module.exports = CacheManager
