var express = require('express');
var router = express.Router();

router.get(
  '/',
  function (req, res, next) {
    next();
  },
  function (...rest) {
    console.log('실행됩니다');
    rest[2]('route');
  },
  function (req, res, next) {
    console.log('실행되지 않습니다2');
    next();
  },
);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
