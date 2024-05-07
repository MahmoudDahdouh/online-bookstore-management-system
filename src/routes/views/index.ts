import { Router } from 'express'
import authRouter from './auth.router'
import profileRouter from './profile.router'
import asyncify from 'express-asyncify'

const router = Router()

// auth router
router.use('/', asyncify(authRouter))

// profile router
router.use('/profile', profileRouter)

// index page
router.get('/', (req, res) => {
  res.render('pages/index', { title: 'index' })
})

// home page
router.get('/home', (req, res) => {
  res.render('pages/home', { title: 'home' })
})

export default router
