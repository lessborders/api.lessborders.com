import passport from 'passport'
import passportJwt from 'passport-jwt'

import { User } from './models/index.js'
import config from './config.js'

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      // check that the user exists in the database
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      // It the user doesn't exist, return an error
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

export default null