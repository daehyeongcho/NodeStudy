const express = require('express')
const nunjucks = require('nunjucks')
const logger = require('morgan')
const bodyParser = require('body-parser')

// db 관련
const db = require('./models')

class App {
  constructor () {
    this.app = express()

    this.dbConnection()
    this.setViewEngine()
    this.setMiddleWare()
    this.getRouting()
  }

  dbConnection () {
    // DB authentication
    db.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.')
        return db.sequelize.sync()
      })
      .then(() => {
        console.log('DB Sync complete.')
      })
      .catch(err => {
        console.error('Unable to connect to the database:' + err)
      })
  }

  setMiddleWare () {
    this.app.use(logger('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  setViewEngine () {
    nunjucks.configure('template', {
      autoescape: true,
      express: this.app
    })
  }

  getRouting () {
    this.app.use(require('./controllers'))
  }
}

module.exports = new App().app
