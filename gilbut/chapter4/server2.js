const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('./chapter4/server2.html', (err, data) => {
    if (err) {
      throw err;
    }
    res.end(data);
  });
});
server.listen(8081, () => {
  console.log('8081번 포트에서 서버 대기 중입니다!');
});
