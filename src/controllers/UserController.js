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
      const userId = req.params.id
      console.log(`\n ${userId} \n`)
      const user = await User.findOne({
        where: {
          id: userId
        },
        attributes: ['email', 'id']
      })
      if(user) {
        res.send(user)
      } else {
        res.status(404).send({
          error: `User not found.`
        })
      }
      
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `User not found.`
      })
    }
  }
}
