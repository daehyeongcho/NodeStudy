const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
console.log('시작');
(async (path) => {
  let data = await readFilePromise(path);
  console.log('1번', data.toString());
  data = await readFilePromise(path);
  console.log('2번', data.toString());
  data = await readFilePromise(path);
  console.log('3번', data.toString());
})('readme2.txt');
console.log('끝');
