import { Request, Response } from 'express'
import Order from '../db/models/Order'
import OrderItem from '../db/models/OrderItem'
import database from '../db/config/connect'
import StatusResponse from '../utils/StatusResponse'
import Book from '../db/models/Book'

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
      console.log({ order: order.dataValues, orders })

      // save order items
      await OrderItem.bulkCreate(
        orders.map((item: any) => ({
          book_id: item.book_id,
          quantity: item.quantity,
          price: item.price,
          order_id: order.dataValues.id,
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

/**
 * getOrders
 * GET
 * /orders
 */
export async function getUserOrders(req: Request, res: Response) {
  const orders = await Order.findAll({
    where: { user_id: req.user.id },
    include: [
      {
        model: OrderItem,
        include: [{ model: Book }],
      },
    ],
  })
  res.status(200).json({ ...StatusResponse(200), orders })
}
