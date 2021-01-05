var Sequelize = require('sequelize')
var path = require('path')
var fs = require('fs')
var dotenv = require('dotenv')

dotenv.config() // LOAD CONFIG

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00', // 한국 시간 셋팅
    operatorsAliases: Sequelize.Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
)

const db = []

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.js') && file !== 'index.js'
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

/** GeomFromText -> ST_GeomFromText
 * MySQL 8.0에선 GeomFromText가 ST_GeomFromText로 변경되었음.
 * 그래서 Sequelize에서도 ST_를 쓰도록 프로토타입을 덮어씌움.
 * node_modules/sequelize/lib/data-types.js 파일에서 GeomFromText를 ST_로 바꿔도 됨.
 * https://github.com/sequelize/sequelize/issues/9786
 */
const Wkt = require('terraformer-wkt-parser')
Sequelize.GEOMETRY.prototype._stringify = (value, options) => {
  return 'ST_GeomFromText(' + options.escape(Wkt.convert(value)) + ')'
}
Sequelize.GEOGRAPHY.prototype._stringify = (value, options) => {
  return 'ST_GeomFromText(' + options.escape(Wkt.convert(value)) + ')'
}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
