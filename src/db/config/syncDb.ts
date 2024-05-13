// list all the models here

import Order from '../models/Order'
import OrderItem from '../models/OrderItem'
import Book from '../models/Book'
import User from '../models/User'

const syncDb = async () => {
  try {
    await Order.sync({ alter: true })
    await OrderItem.sync({ alter: true })
    await Book.sync({ alter: true })
    await User.sync({ alter: true })
    console.log('Database synchronized successfully')
  } catch (error) {
    throw error
  }
}
syncDb()
