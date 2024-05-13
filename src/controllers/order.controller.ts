import { Request, Response } from 'express'
import Order from '../db/models/Order'
import OrderItem from '../db/models/OrderItem'
import database from '../db/config/connect'
import StatusResponse from '../utils/StatusResponse'

/**
 * checkout
 * POST
 * /checkout
 */
export async function checkout(req: Request, res: Response) {
  const { orders } = req.body
  // calculate total
  const total = orders.reduce((acc: any, arr: any) => {
    return acc + arr.price * arr.quantity
  }, 0)

  try {
    //  add transaction
    await database.transaction(async (t) => {
      // save order
      const order = await Order.create(
        { total, user_id: req.user.id },
        { transaction: t }
      )
      // save order items
      await OrderItem.bulkCreate(
        orders.map((item: any) => ({
          ...item,
          order_id: order.id,
          user_id: req.user.id,
        })),
        { transaction: t }
      )
    })
    res.status(201).json({
      ...StatusResponse(201, 'Your order has been successfully placed.'),
    })
  } catch (error) {
    throw error
  }
}
