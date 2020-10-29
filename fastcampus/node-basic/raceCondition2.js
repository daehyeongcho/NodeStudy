/** Javascript와 Mutex :
 * Javascript도 setTimeout 같은 async 함수들이 있기 때문에
 * mutex가 필요함
 * (https://stackoverflow.com/questions/124764/are-mutexes-needed-in-javascript)
 *
 * 밑의 예시코드 출처 : https://stackoverflow.com/questions/21438207/can-node-js-code-result-in-race-conditions
 */
class Lock {
  constructor () {
    this._locked = false
    this._waiting = [] // 비동기 작업들(Promises) 대기열
  }

  lock () {
    const unlock = () => {
      let nextResolve // 다음 대기열
      // 대기열이 남아있으면
      if (this._waiting.length > 0) {
        nextResolve = this._waiting.pop(0)
        nextResolve(unlock)
      } else {
        this._locked = false
      }
    }
    // 현재 unlock은 정의만 되어있고 호출 안되고 있음

    // 잠겨있으면 대기열에 push
    if (this._locked) {
      return new Promise(resolve => {
        this._waiting.push(resolve)
      })
    } else {
      // 문제 1 : 이부분 채우기
      this._locked = true
      return new Promise(resolve => {
        resolve(unlock)
      })
    }
  }
}

// 문제2 : 아래 코드에서 Lock을 어떻게 활용할 것인지?

let accountBalance = 0
async function getAccountBalance () { return accountBalance }
async function setAccountBalance (value) { accountBalance = value }
async function increment (value, incr) { return value + incr }

const account = new Lock()

async function add$50 () {
  // unlock을 하면 다음 비동기코드가 실행되어도 된다는 의미
  const unlock = await account.lock()

  // 이 밑의 셋이 하나의 transaction임
  const balance = await getAccountBalance()
  const newBalance = await increment(balance, 50)
  await setAccountBalance(newBalance)

  await unlock()
}
async function main () {
  const transaction1 = add$50() // transaction 1
  const transaction2 = add$50() // transaction 2
  await transaction1
  await transaction2
  console.log(await getAccountBalance())
  // lock 걸기 전엔 50이 출력됐음 (동시에 0을 받아서 50을 출력했기 때문)
  // lock 걸고나니 100이 출력됨
  // 이 문제는 사실 await add$50() 하면 간단히 해결되는 문제임
  // 작성자는 단지 race condition이 발생할 수 있다는 것을 보여주고싶었음

  // Can print either $50 or $100
  // which it prints is dependent on what order
  // things arrived on the message queue, for this very simple
  // dummy implementation it actually prints $50 because
  // all values are added to the message queue immediately
  // so it actually alternates between the two async functions
}
main()
