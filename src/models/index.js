import Sequelize from 'sequelize'

import configLocal from '../config.js'
import User from './User.js'

let db = {}
var _sequelize = null

_sequelize = new Sequelize(
  configLocal.db.database,
  configLocal.db.user,
  configLocal.db.password,
  configLocal.db.options
)

_sequelize.authenticate().then(function () {
  console.log('Database connected and authenticated!')
  return true
}).catch(function (err) {
  console.error('Failed to connect and authenticate', err)
  return false
})

let model = User(_sequelize, Sequelize.DataTypes)
db[model.name] = model

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = _sequelize
db.Sequelize = Sequelize

let userModel = db.User

export { userModel as User }
export const sequelize = db.sequelize