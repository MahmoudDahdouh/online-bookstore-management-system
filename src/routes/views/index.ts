import { authPage } from './../../middlewares/auth.middleware'
import { Request, Response, Router } from 'express'
import authRouter from './auth.router'
import profileRouter from './profile.router'
import asyncify from 'express-asyncify'
import axios from '../../config/axios'

const router = Router()

// auth router
router.use('/', asyncify(authRouter))

// profile router
router.use('/profile', [authPage], asyncify(profileRouter))

// index page
router.get('/', (req, res) => {
  res.render('pages/index', { title: 'index', user: req.session.user })
})

// home page
router.get('/books', [authPage], async (req: Request, res: Response) => {
  await axios
    .get('/book', {
      headers: { Authorization: `Bearer ${req.session.user.token}` },
    })
    .then((response) => {
      console.log({ books: response.data.books })
      res.render('pages/books', {
        title: 'home',
        user: req.session.user,
        books: response.data.books,
      })
    })
    .catch((error) => {
      const { data } = error.response
      return res.render('pages/books', {
        title: 'home',
        user: req.session.user,
        error: data.message,
      })
    })
})

export default router
