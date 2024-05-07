import { Router } from 'express'

const router = Router()

// profile
router.get('/', (req, res) => {
  res.render('pages/profile', { title: 'profile' })
})

// edit profile
router.get('/edit', (req, res) => {
  res.render('pages/profile_edit', { title: 'edit profile' })
})

// orders
router.get('/orders', (req, res) => {
  res.render('pages/orders', { title: 'orders' })
})

export default router
