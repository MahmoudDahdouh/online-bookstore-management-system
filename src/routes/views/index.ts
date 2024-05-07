import { Router } from 'express'

const router = Router()

// index page
router.get('/', (req, res) => {
  res.render('pages/index', { title: 'index' })
})

// login page
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'login' })
})

// register page
router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'register' })
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

export default router
