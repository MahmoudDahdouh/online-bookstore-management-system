import { Router } from 'express'
import authRouter from './auth'

const router = Router()

// auth router
router.use('/', authRouter)

// index page
router.get('/', (req, res) => {
  res.render('pages/index', { title: 'index' })
})

// home page
router.get('/home', (req, res) => {
  res.render('pages/home', { title: 'home' })
})

// profile
router.get('/profile', (req, res) => {
  res.render('pages/profile', { title: 'profile' })
})

// edit profile
router.get('/profile/edit', (req, res) => {
  res.render('pages/profile_edit', { title: 'edit profile' })
})

// orders
router.get('/profile/orders', (req, res) => {
  res.render('pages/orders', { title: 'orders' })
})
export default router
