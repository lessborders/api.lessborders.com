const jwt = require('jsonwebtoken')
const config = require('../config/config')

const { User } = require('../models')

// The jwtSignUser method is used for generating a jwt token
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      // Return a jwt token while the user register with the user information
      // Otherwise, the user has to log in after they register
      const userJson = user.toJSON()
      res.send({
        user: user.id,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  // The AuthenticationController.login method
  async login (req, res) {
    try {
      // Grab email and password from req.body
      const { email, password } = req.body
      // Find a user using an email
      const user = await User.findOne({
        where: { email: email }
      })

      // If the login user doesn't have that email, return an error
      if (!user || !password) {
        return res.status(403).send({
          error: 'Incorrect email or password given'
        })
      }

      console.log(password)
      // If the password doesn't match the user's password, return an error
      const isPasswordValid = await user.comparePassword(password)
      // console.log('isPasswordValid', isPasswordValid, password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Incorrect email or password given'
        })
      }

      // Otherwise, return a jwt token with the user information
      const userJson = user.toJSON()
      res.send({
        user: user.id,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Oops! Something went wrong'
      })
    }
  }
}
