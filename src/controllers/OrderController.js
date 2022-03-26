import { Order } from '../models'
import _ from'lodash'

export default {
  async getUserOrders (req, res) {
    try {
      const ordersList = await User.findAll({ 
        where: {
          [Op.or]: [
            { customerId: req.user.id },
            { handlerd: req.user.id }
          ]
        },
        attributes: ['id', 'customerId', 'handlerId'] 
      })
      res.send(ordersList)
    } catch (err) {
      res.status(500).send({
        error: `No orders found.`
      })
    }
  },
  async getUserOrder (req, res) {
    try {
      const orderId = req.params.id
      const order = await Order.findOne({
        where: {
          id: orderId
        },
        attributes: ['id', 'customerId', 'handlerId']
      })
      if(order && (order.customerId === req.user.id || order.handlerId === req.user.id)) {
        res.send(order)
      } else {
        res.status(404).send({
          error: `Order not found.`
        })
      }
      
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `Order not found.`
      })
    }
  }
}
