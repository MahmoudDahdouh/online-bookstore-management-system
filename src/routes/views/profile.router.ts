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
 * Orders
 */
router.get('/orders', (req, res) => {
  res.render('pages/orders', { title: 'orders', user: req.session.user })
})

export default router
