const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);

console.log('path.delimiter:', path.delimiter);
console.log('-------------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log(string);

console.log(
  'path.normalize():',
  path.normalize('C://users\\\\zerocho\\path.js'),
);
console.log('path.parse():', path.parse(string));
console.log(
  'path.join():',
  path.join(__dirname, '..', '..', '/users', '.', 'zerocho'),
);
