const url = require('url');

//WHATWG
const myURL = new url.URL('https://www.youtube.com/watch?v=dcQhGd7Bds8&t=880s');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));

console.log('---------------------------------');

//기존 노드 방식
const parsedUrl = url.parse(
  'https://www.youtube.com/watch?v=dcQhGd7Bds8&t=880s',
);
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));
