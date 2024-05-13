import { Request, Response } from 'express'
import Order from '../db/models/Order'
import OrderItem from '../db/models/OrderItem'

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

  const order = await Order.create({ total, user_id: 1 })

  //   save order items
  await OrderItem.bulkCreate(
    orders.map((item: any) => ({
      ...item,
      order_id: order.id,
      user_id: 1,
    }))
  )

  res.json(orders)
}
/**
{
    "items": [
        {
            "book_id": 13,
            "price": 817,
            "quantity": 3
        },
        {
            "book_id": 12,
            "price": 831,
            "quantity": 2
        }
    ]
}
 */

/*
{
    "cart": [
        {
            "id": 13,
            "price": 817,
            "quantity": 4,
        },
        {
            "id": 12,
            "price": 831,
            "quantity": 2,
        },
        {
            "id": 11,
            "price": 858,
            "quantity": 1,
        },
        {
            "id": 9,
            "price": 9,
            "quantity": 12,
        }
    ]
}
*/
