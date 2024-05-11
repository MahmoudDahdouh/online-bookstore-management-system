import { Router } from 'express'
import { isValidToken } from '../../utils/jwt'
import axios from '../../config/axios'
import { ROLES } from '../../utils/roles'

const router = Router()

/**
 * Login page
 */
router.get('/login', (req, res) => {
  // check if there is a user in the session
  if (req.session.user && isValidToken(req.session.user.token)) {
    return res.redirect('/books')
  }
  return res.render('pages/login', {
    title: 'login',
    error: req.query.error,
  })
})

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  await axios
    .post('/auth/login', { email, password })
    .then((response) => {
      const user = response.data
      if (user.success) {
        // create a session
        req.session.user = { ...user.user, token: user.access_token }
        return res.redirect('/books')
      }
    })
    .catch((error) => {
      const { data } = error.response
      return res.redirect(`/login?error=${data.message}`)
    })
})

/**
 * Register page
 */
router.get('/register', (req, res) => {
  // check if there is a user in the session
  if (req.session.user && isValidToken(req.session.user.token)) {
    return res.redirect('/books')
  }
  return res.render('pages/register', {
    title: 'register',
    error: req.query.error,
  })
})

// register
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body
  await axios
    .post('/auth/register', { email, password, username })
    .then((response) => {
      const user = response.data
      if (user.success) {
        // create a session
        req.session.user = { ...user.user, token: user.access_token }
        return res.redirect('/books')
      }
    })
    .catch((error) => {
      const { data } = error.response
      return res.redirect(`/register?error=${data.message}`)
    })
})

/**
 * Admin login
 */
router.get('/admin-login', (req, res) => {
  // check if there is a user in the session
  if (req.session.user && isValidToken(req.session.user.token)) {
    if (req.session.user.user_role == ROLES.admin) return res.redirect('/admin')
  }
  res.render('pages/admin-login', {
    title: 'admin login',
    error: req.query.error,
  })
})
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body

  await axios
    .post('/auth/login/admin', { email, password })
    .then((response) => {
      const user = response.data

      if (user.success) {
        // create a session
        console.log('done lez goo')
        req.session.user = { ...user.user, token: user.access_token }
        return res.redirect('/admin')
      }
    })
    .catch((error) => {
      const { data } = error.response
      return res.redirect(`/admin-login?error=${data.message}`)
    })
})

/**
 * Logout
 */
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/books')
    }
    return res.redirect('/')
  })
})

export default router
