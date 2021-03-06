import passport from 'passport'

export default function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: 'You do not have access to this resource'
      })
    } else {
      // User exists and token valid
      req.user = user
      next()
    }
  })(req, res, next)
}
