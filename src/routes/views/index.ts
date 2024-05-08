import { authPage } from './../../middlewares/auth.middleware'
import { Request, Response, Router } from 'express'
import authRouter from './auth.router'
import profileRouter from './profile.router'
import asyncify from 'express-asyncify'
import axios from '../../config/axios'
import bookRouter from './books.router'

const router = Router()

// auth router
router.use('/', asyncify(authRouter))

// profile router
router.use('/profile', [authPage], asyncify(profileRouter))

// books router
router.use('/books', [authPage], asyncify(bookRouter))

// index page
router.get('/', (req, res) => {
  res.render('pages/index', { title: 'index', user: req.session.user })
})

export default router
