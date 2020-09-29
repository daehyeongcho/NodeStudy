const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const path = './readme2.txt';
const promise1 = Promise.resolve(readFilePromise(path)).then((data) => {
  console.log('1번', data.toString());
});
const promise2 = Promise.resolve(readFilePromise(path)).then((data) => {
  console.log('2번', data.toString());
});
const promise3 = Promise.resolve(readFilePromise(path)).then((data) => {
  console.log('3번', data.toString());
});

console.log('시작');
Promise.all([promise1, promise2, promise3]);
console.log('끝');
