var express = require('express');
var User = require('../models').User;

var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    console.log('users start');
    console.log(users);
    res.render('sequelize', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
