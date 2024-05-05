import { Router } from 'express'

const router = Router()

// index page
router.get('/', (req, res) => {
  res.render('pages/index', {})
})

// login page
router.get('/login', (req, res) => {
  res.render('pages/login')
})

export default router
