const { User } = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const usersList = await User.findAll({ attributes: ['email', 'id'] })
      res.send(usersList)
    } catch (err) {
      res.status(500).send({
        error: `No users found...`
      })
    }
  },
  async getUser (req, res) {
    try {
      const userId = req.params.user
      console.log(`\n ${userId} \n`)
      const user = await User.findOne({
        where: {
          id: userId
        },
        attributes: ['email', 'id']
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `User not found.`
      })
    }
  }
}
