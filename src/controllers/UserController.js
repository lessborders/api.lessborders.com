const { User } = require('../models')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const config = require('../config/config')

module.exports = {
  async index (req, res) {
    try {
      const usersList = await User.findAll({ attributes: ['email', 'id'] })
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
      const userId = req.params.id
      const user = await User.findOne({
        where: {
          id: userId
        },
        attributes: ['id', 'email', 'password']
      })
      if(user && user.id === req.user.id) {
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
