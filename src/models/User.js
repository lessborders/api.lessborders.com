const bcrypt = require('bcrypt')

// A hashPassword method to call user's password, hash it, and save it again
function hashPassword (user, options) {
  const SALT_FACTOR = 8
  console.log('hashPassword')

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltSync(SALT_FACTOR)
    .then(salt => bcrypt.hashSync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  },
  {
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.associate = function (models) {
  }

  return User
}
