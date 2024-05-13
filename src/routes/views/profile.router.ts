import { Router } from 'express'
import axios from '../../config/axios'

const router = Router()

/**
 * Profile
 */
router.get('/', (req, res) => {
  res.render('pages/profile', { title: 'profile', user: req.session.user })
})

/**
 * Edit profile
 */
router.get('/edit', (req, res) => {
  res.render('pages/profile_edit', {
    title: 'edit profile',
    user: req.session.user,
  })
})

/**
 * My orders
 */
router.get('/orders', async (req, res) => {
  await axios
    .get('/order', {
      headers: { Authorization: `Bearer ${req.session.user.token}` },
    })
    .then((response) => {
      res.render('pages/orders', {
        title: 'orders',
        user: req.session.user,
        orders: response.data.orders,
      })
    })
    .catch((error) => {
      const { data } = error.response
      return res.render('pages/profile', {
        title: 'profile',
        user: req.session.user,
        error: data.message,
      })
    })
})

export default router
