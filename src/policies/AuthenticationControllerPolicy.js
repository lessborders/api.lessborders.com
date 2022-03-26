import Joi from 'joi'

export default {
  register (req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: error.details[0].message
          })
          break
        case 'password':
          res.status(400).send({
            error: error.details[0].message
          })
          break
        default:
          res.status(400).send({
            error: `Invalid registration information`
          })
      }
    } else {
      next()
    }
  }
}
