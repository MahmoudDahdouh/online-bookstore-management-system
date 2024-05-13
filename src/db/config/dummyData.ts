import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const password = '$2b$10$9TlMScMysc/IprYd8h2cpOx84kd//IFSs10N9eckx9NUiG3uxoB4m'

// create users
export const users = [...Array(5)].map(() => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password_hash: password,
    user_role: 'user',
  }
})

// create book
export const books = [...Array(50)].map(() => {
  return {
    title: faker.word.words(3),
    description: faker.word.words(3),
    author: faker.helpers.arrayElement([
      'john',
      'jane',
      'smith',
      'mike',
      'jones',
      'james',
      'brown',
      'david',
      'miller',
    ]),
    genre: faker.helpers.arrayElement([
      'fiction',
      'non-fiction',
      'biography',
      'history',
      'science',
    ]),
    language: faker.helpers.arrayElement([
      'english',
      'french',
      'arabic',
      'german',
      'italian',
    ]),
    isbn: faker.number.int({ min: 1000000000000, max: 9999999999999 }),
    price: faker.number.int({ min: 10, max: 99 }),
    page_count: faker.number.int({ min: 10, max: 99 }),
    quantity: faker.number.int({ min: 10, max: 99 }),
    published_date: faker.date.past(10),
  }
})
