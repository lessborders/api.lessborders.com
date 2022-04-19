import jwt from 'jsonwebtoken'
import config from '../config.js'
import { User } from '../models/index.js'

// The jwtSignUser method is used for generating a jwt token
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
export default {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      // Return a jwt token
      const userJson = user.toJSON()
      res.send({
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email: email }
      })

      if (!user || !password) {
        return res.send({
          error: 'Incorrect email or password given'
        })
      }

      console.log(password)
      const isPasswordValid = await user.comparePassword(password)
      // console.log('isPasswordValid', isPasswordValid, password)
      if (!isPasswordValid) {
        return res.send({
          error: 'Wrong password. Please try again.'
        })
      }

      // Return a jwt token
      const userObj = {
        id: user.id
      }
      const userJson = userObj
      const token = jwtSignUser(userJson)
      const ssoJwt = {
        token: token
      }
      res.send(ssoJwt)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Oops! Something went wrong'
      })
    }
  }
}
