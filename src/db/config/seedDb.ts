import bcrypt from 'bcrypt'
// list all the models here

import Order from '../models/Order'
import OrderItem from '../models/OrderItem'
import Book from '../models/Book'
import User from '../models/User'
import { faker } from '@faker-js/faker'
import { books, users } from './dummyData'

const seedDb = async () => {
  try {
    await User.bulkCreate(users)
    await Book.bulkCreate(books)
    console.log('Database seeded successfully')
  } catch (error) {
    throw error
  }
}
seedDb()
