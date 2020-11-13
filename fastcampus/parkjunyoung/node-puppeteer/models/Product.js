const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  })

  Products.prototype.dataFormat = date => {
    moment(date).format('YYYY-MM-DD')
  }

  return Products
}
