const express = require('express')
const nunjucks = require('nunjucks')
const logger = require('morgan')
const bodyParser = require('body-parser')

class App {
  constructor () {
    this.app = express()

    // 뷰엔진 세팅
    this.setViewEngine()

    // 미들웨어 세팅
    this.setMiddleWare()

    // 정적 디렉토리 추가
    this.setStatic()

    // 로컬 변수
    this.setLocals()

    // 라우팅
    this.getRouting()

    // 404 페이지를 찾을수가 없음
    this.status404()

    // 에러 처리
    this.errorHandler()
  }

  setMiddleWare () {
    // 미들웨어 세팅
    this.app.use(logger('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  setViewEngine () {
    nunjucks.configure('template', {
      autoescape: true, // prevents executing html tags from users
      express: this.app
    })
  }

  setStatic () {
    this.app.use('uploads', express.static('uploads'))
  }

  setLocals () {
    // 템플릿 변수
    this.app.use((req, _, next) => {
      this.app.locals.isLogin = true
      this.app.locals.req_path = req.path
      next()
    })
  }

  getRouting () {
    this.app.use(require('./controllers'))
  }

  status404 () {
    this.app.use((req, res, _) => {
      res.status(404).render('common/404.html')
    })
  }

  errorHandler () {
    this.app.use((err, req, res, _) => {
      console.log(err)
      res.status(500).render('common/500.html')
    })
  }
}

// const admin = require("./routes/admin");
// const contacts = require("./routes/contacts");

// app.get("/", (req, res) => {
//   res.send("express start");
// });

// const vipMiddleware = (_, res, next) => {
//   console.log("최우선 미들웨어");
//   next();
// };

// app.use("/admin", vipMiddleware, admin);
// app.use("/contacts", contacts);

module.exports = new App().app
