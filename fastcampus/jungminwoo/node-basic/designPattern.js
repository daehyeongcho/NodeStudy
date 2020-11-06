'use strict'

/** Functional Programming */
const numbers = [10, 20, 30, 40]

const avg = numbers.reduce((tot, val, idx, arr) => {
  tot += val
  if (idx === arr.length - 1) {
    return tot / arr.length
  } else {
    return tot
  }
})
console.log(avg)

const numbers2 = [0, 1, 2, 3, 4, 5, 6]
const res = numbers2.reduce((tot, amt) => {
  if (amt > 0) tot.push(amt)
  return tot
}, [])
console.log(res)

const arr = ['pdf', 'html', 'html', 'gif', 'gif', 'gif']
// My Answer
const obj = arr.reduce((cnt, fileType) => {
  if (cnt[fileType] === undefined) {
    cnt[fileType] = 0
  }
  cnt[fileType] += 1
  return cnt
}, {})
console.log(obj)

// Refactoring
const obj2 = arr.reduce((cnt, fileType) => {
  cnt[fileType] = (cnt[fileType] || 0) + 1
  return cnt
}, {})
console.log(obj2)

/** Singleton Pattern :
 * 인스턴스가 오직 1개만 생성됨을 보장하는 패턴
 * ex. 환경설정, 캐시매니저(redis 기반)
 */
class CacheManager {
  constructor () {
    if (!CacheManager.instance) {
      this._cache = []
      CacheManager.instance = this
    }
    return CacheManager.instance
  }
}
const instance = new CacheManager()
Object.freeze(instance) // 동결된 객체는 더 이상 변겯될 수 없음

/** Adapter Pattern :
 * 클래스의 인터페이스를 사용자가 기대하는 다른 인터페이스로 변환
 */
// Lion interface : roar()
class AfricanLion {
  roar () { console.log('AfricanLion Roar') }
}
class Hunter {
  hunt (lion) {
    // ... some code before
    lion.roar()
    // ... some code after
  }
}
class WildDog {
  bark () { console.log('WildDog Bark') }
}
class WildDogAdapter {
  constructor (dog) {
    this.dog = dog
  }

  roar () {
    this.dog.bark()
  }
}
const africanLion = new AfricanLion()
const wildDog = new WildDog()
const wildDogAdapter = new WildDogAdapter(wildDog)
const hunter = new Hunter()
hunter.hunt(africanLion)
hunter.hunt(wildDogAdapter)

/** Bridge Pattern :
 * 구현부에서 추상층을 분리하여 각자 독립적으로 변형할 수 있게 하는 패턴
 */
// Webpage interface :
class About {
  constructor (theme) {
    this.theme = theme
  }

  getContent () {
    return 'About page in ' + this.theme.getColor()
  }
}
class Careers {
  constructor (theme) {
    this.theme = theme
  }

  getContent () {
    return 'Careers page in ' + this.theme.getColor()
  }
}
// Theme interface :
class DarkTheme {
  getColor () { return 'Dark Black' }
}

class LightTheme { // eslint-disable-line
  getColor () { return 'Off white' }
}
class AquaTheme { // eslint-disable-line
  getColor () { return 'Light blue' }
}
const darkTheme = new DarkTheme()
const about = new About(darkTheme)
const careers = new Careers(darkTheme)
console.log(about.getContent())
console.log(careers.getContent())

/** Decorator Pattern :
 * 기본 기능에 추가할 수 있는 기능의 종류가 많은 경우에
 * 각 추가기능을 Decorator 클래스로 정의한 후 필요한 Decorator 객체를
 * 조합함으로써 추가 기능의 조합을 설계하는 방식
 * */
// Coffee interface :
class SimpleCoffee {
  getCost () { return 10 }
  getDescription () { return 'Simple Coffee' }
}
// Decorators :
class MilkCoffee {
  constructor (coffee) {
    this.coffee = coffee
  }

  getCost () {
    return this.coffee.getCost() + 2
  }

  getDescription () {
    return this.coffee.getDescription() + ', milk'
  }
}
class WhipCoffee {
  constructor (coffee) {
    this.coffee = coffee
  }

  getCost () {
    return this.coffee.getCost() + 5
  }

  getDescription () {
    return this.coffee.getDescription() + ', whip'
  }
}
class VanillaCoffee {
  constructor (coffee) {
    this.coffee = coffee
  }

  getCost () {
    return this.coffee.getCost() + 3
  }

  getDescription () {
    return this.coffee.getDescription() + ', vanilla'
  }
}

let someCoffee

someCoffee = new SimpleCoffee()
console.log(someCoffee.getCost())
console.log(someCoffee.getDescription())

someCoffee = new MilkCoffee(someCoffee)
console.log(someCoffee.getCost())
console.log(someCoffee.getDescription())

someCoffee = new WhipCoffee(someCoffee)
console.log(someCoffee.getCost())
console.log(someCoffee.getDescription())

someCoffee = new VanillaCoffee(someCoffee)
console.log(someCoffee.getCost())
console.log(someCoffee.getDescription())

/** Composite Pattern:
 * 객체들의 관계를 트리구조로 구성하여 부분 전체 계층을 표현하는 패턴
 * 사용자가 단일 객체와 복합 객체를 동일하게 다루게 할 수 있음
 */
// Employee interface
class Developer {
  constructor (name, salary) {
    this.name = name
    this.salary = salary
  }

  getName () { return this.name }
  setSalary (salary) { this.salary = salary }
  getSalary () { return this.salary }
  getRoles () { return this.roles }
  develop () {}
}
class Designer {
  constructor (name, salary) {
    this.name = name
    this.salary = salary
  }

  getName () { return this.name }
  setSalary (salary) { this.salary = salary }
  getSalary () { return this.salary }
  getRoles () { return this.roles }
  design () { }
}

class Organization {
  constructor () { this.employees = [] }

  addEmployee (employee) { this.employees.push(employee) }
  getNetSalaries () {
    let netSalary = 0

    this.employees.forEach(employee => {
      netSalary += employee.getSalary()
    })

    return netSalary
  }
}

const john = new Developer('John Doe', 12000)
const jane = new Designer('Jane', 10000)

const organization = new Organization()
organization.addEmployee(john)
organization.addEmployee(jane)

console.log('Net salaries: ', organization.getNetSalaries())
