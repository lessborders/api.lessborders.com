const { User } = require('../models')
const _ = require('lodash')

module.exports = {
  async getUsers (req, res) {
    try {
      const usersList = await User.findAll({ 
        attributes: ['email', 'id'] 
      })
      res.send(usersList)
    } catch (err) {
      res.status(500).send({
        error: `No users found.`
      })
    }
  },
  async getPublicUser (req, res) {
    try {
      const userId = req.params.id
      const user = await User.findOne({
        where: {
          id: userId
        },
        attributes: ['id']
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
  },
  async getPrivateUser (req, res) {
    try {
      let userId = 0;
      if(req.params.id > 0) {
        userId = req.params.id
      }else if(req.user.id) {
        userId = req.user.id
      }

      const user = await User.findOne({
        where: {
          id: userId
        }
      })
      
      if(user && user.id === req.user.id) {
        res.send(user)
      } else {
        res.status(404).send({
          error: `You dont have access to this resource`
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
