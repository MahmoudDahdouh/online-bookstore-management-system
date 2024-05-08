import { Router } from 'express'

const router = Router()

// profile
router.get('/', (req, res) => {
  res.render('pages/profile', { title: 'profile', user: req.session.user })
})

// edit profile
router.get('/edit', (req, res) => {
  res.render('pages/profile_edit', {
    title: 'edit profile',
    user: req.session.user,
  })
})

// orders
router.get('/orders', (req, res) => {
  res.render('pages/orders', { title: 'orders', user: req.session.user })
})

export default router
