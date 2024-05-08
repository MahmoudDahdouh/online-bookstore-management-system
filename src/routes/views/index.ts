import { authPage } from './../../middlewares/auth.middleware'
import { Request, Response, Router } from 'express'
import authRouter from './auth.router'
import profileRouter from './profile.router'
import asyncify from 'express-asyncify'

const router = Router()

// auth router
router.use('/', asyncify(authRouter))

// profile router
router.use('/profile', [authPage], asyncify(profileRouter))

// index page
router.get('/', (req, res) => {
  res.render('pages/index', { title: 'index', user: req.session.user })
})

// home page
router.get('/home', [authPage], (req: Request, res: Response) => {
  return res.render('pages/home', { title: 'home', user: req.session.user })
})

export default router
