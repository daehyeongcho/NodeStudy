const fs = require('fs');
const util = require('util');

console.log('시작');
const readFilePromise = util.promisify(fs.readFile);
readFilePromise('./readme2.txt')
  .then((data) => {
    console.log('1번', data.toString());
    return readFilePromise('./readme2.txt');
  })
  .then((data) => {
    console.log('2번', data.toString());
    return readFilePromise('./readme2.txt');
  })
  .then((data) => {
    console.log('3번', data.toString());
  })
  .catch((err) => {
    throw err;
  });
console.log('끝');
