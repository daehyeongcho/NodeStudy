const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00', // 한국 시간 셋팅
    operatorAliases: Sequelize.Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
)

const db = []

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.js') && file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
