import { adminPage, authPage } from './../../middlewares/auth.middleware'
import { Router } from 'express'
import authRouter from './auth.router'
import profileRouter from './profile.router'
import adminRouter from './admin.router'
import cartRouter from './cart.router'
import asyncify from 'express-asyncify'
import bookRouter from './books.router'

const router = Router()

// auth router
router.use('/', asyncify(authRouter))

// profile router
router.use('/profile', [authPage], asyncify(profileRouter))

// profile router
router.use('/cart', [authPage], asyncify(cartRouter))

// books router
router.use('/books', [authPage], asyncify(bookRouter))

// admin router
router.use('/admin', [adminPage], asyncify(adminRouter))

// index page
router.get('/', (req, res) => {
  res.render('pages/index', { title: 'index', user: req.session.user })
})

export default router
