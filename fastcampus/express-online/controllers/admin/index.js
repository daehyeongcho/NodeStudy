const { Router } = require('express')
const router = Router()
const ctrl = require('./admin.ctrl')

const testMiddleware = (req, res, next) => {
  console.log('첫번째 미들웨어')
  next()
}
const testMiddleware2 = (req, res, next) => {
  console.log('두번째 미들웨어')
  next()
}

// const loginRequired = (req, res, next) => {
//   if (로그인이되어있지않으면) {
//     res.redirect(로그인창으로);
//   } else {
//     next();
//   }
// };

router.get('/', testMiddleware, testMiddleware2, (req, res) => {
  res.send('admin app')
})

router.get('/products', ctrl.get_products)

router.get('/products/write', ctrl.get_products_write)

router.post('/products/write', ctrl.post_products_write)

module.exports = router
