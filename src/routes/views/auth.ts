import { Router } from 'express'

const router = Router()

// login page
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'login' })
})

// register page
router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'register' })
})

export default router
