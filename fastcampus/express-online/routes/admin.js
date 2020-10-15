const express = require("express");
const router = express.Router();
const nunjucks = require("nunjucks");

const testMiddleware = (req, res, next) => {
  console.log("첫번째 미들웨어");
  next();
};
const testMiddleware2 = (req, res, next) => {
  console.log("두번째 미들웨어");
  next();
};

// const loginRequired = (req, res, next) => {
//   if (로그인이되어있지않으면) {
//     res.redirect(로그인창으로);
//   } else {
//     next();
//   }
// };

router.get("/", testMiddleware, testMiddleware2, (req, res) => {
  res.send("admin 이후 url");
});

router.get("/products", (req, res) => {
  // res.send("admin products");
  res.render("admin/products.html", {
    message: "<h1>태그가 출력됩니다.<h1>",
    online: "express",
  });
});

router.get("/products/write", (req, res) => {
  res.render("admin/write.html");
});

router.post('/products/write', (req, res) => {
  res.send(req.body);
})

module.exports = router;
