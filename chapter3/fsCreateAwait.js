const fs = require('fs');
const { promisify } = require('util');

(async (path) => {
  try {
    await promisify(fs.access)(
      path,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      await promisify(fs.mkdir)(path);
      console.log('폴더 만들기 성공');
      let fd = await promisify(fs.open)(path + '/file.js', 'w');
      console.log('빈 파일 만들기 성공', fd);
      await promisify(fs.rename)(path + '/file.js', path + '/newfile.js');
      console.log('이름 바꾸기 성공');
    }
  }
})('./folder');
