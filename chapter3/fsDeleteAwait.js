const fs = require('fs');
const { promisify } = require('util');

(async (path) => {
  let dir = await promisify(fs.readdir)(path);
  console.log('폴더 내용 확인', dir);
  await promisify(fs.unlink)(path + '/newfile.js');
  console.log('파일 삭제 성공');
  await promisify(fs.rmdir)(path);
  console.log('폴더 삭제 성공');
})('./folder');
