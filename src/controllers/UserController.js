import { User } from '../models/index.js'
import _ from'lodash'

export default {
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
      const { email } = req.body
      const user = await User.findOne({
        where: {
            email: email
        },
        attributes: ['id']
      })
      if(user) {
        res.send(user)
      } else {
        res.send({
          error: `Couldn't find an account`
        })
      }
      
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `Oopsies.`
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
        },
        attributes: ['id', 'email']
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
  },
}
