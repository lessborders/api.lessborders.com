const fs = require('fs')
const path = require('path')
var basename = path.basename(module.filename)
const Sequelize = require('sequelize')

var env = process.env.NODE_ENV || 'development'
var configLocal = require('../config/config')
var db = {}
var sequelize = null

sequelize = new Sequelize(
  configLocal.db.database,
  configLocal.db.user,
  configLocal.db.password,
  configLocal.db.options
)

sequelize.authenticate().then(function () {
  console.log('Database connected and authenticated!')
  return true
}).catch(function (err) {
  console.error('Failed to connect and authenticate', err)
  return false
})

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(function (file) {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
