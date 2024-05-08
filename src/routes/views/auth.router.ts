import { Router } from 'express'
import { isValidToken } from '../../utils/jwt'

const router = Router()

/**
 * Login page
 */
router.get('/login', (req, res) => {
  // check if there is a user in the session
  if (req.session.user && isValidToken(req.session.user.token)) {
    return res.redirect('/home')
  }
  return res.render('pages/login', {
    title: 'login',
    error: req.query.error,
  })
})

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await fetch('http://localhost:3000/api/v1.0/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await user.json()
  if (data.success) {
    // create a session
    console.log({ data })

    req.session.user = { ...data.user, token: data.access_token }
    return res.redirect('/home')
  }
  return res.redirect(`/login?error=${data.message}`)
})

/**
 * Register page
 */
router.get('/register', (req, res) => {
  // check if there is a user in the session
  if (req.session.user && isValidToken(req.session.user.token)) {
    return res.redirect('/home')
  }
  return res.render('pages/register', {
    title: 'register',
    error: req.query.error,
  })
})

// register
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body

  const user = await fetch('http://localhost:3000/api/v1.0/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, username }),
  })

  const data = await user.json()
  if (data.success) {
    console.log({ data })

    req.session.user = { ...data.user, token: data.token }
    return res.redirect('/home')
  }
  return res.redirect(`/register?error=${data.message}`)
})

/**
 * Logout
 */
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/home')
    }
    return res.redirect('/')
  })
})

export default router
