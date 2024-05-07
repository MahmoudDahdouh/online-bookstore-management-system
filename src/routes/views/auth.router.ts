import { Router } from 'express'
import { getUserByEmail } from '../../services/auth.service'
import bcrypt from 'bcrypt'
import { generateToken } from '../../utils/jwt'
import { login } from '../../controllers/auth.controller'

const router = Router()

// login page
router
  .get('/login', async (req, res) => {
    res.render('pages/login', { title: 'login', error: req.query.error })
  })
  .post('/login', async (req, res) => {
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
      return res.redirect('/home')
    }
    return res.redirect(`/login?error=${data.message}`)
  })

// register page
router
  .get('/register', (req, res) => {
    res.render('pages/register', { title: 'register', error: req.query.error })
  })
  .post('/register', async (req, res) => {
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
      return res.redirect('/home')
    }
    return res.redirect(`/register?error=${data.message}`)
  })

export default router
