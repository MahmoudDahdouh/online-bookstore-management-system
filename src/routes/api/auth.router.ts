import { Router } from 'express'
import {
  adminLogin,
  login,
  logout,
  register,
} from '../../controllers/auth.controller'
import { loginSchema, registerSchema } from '../../validate/auth.schema'
import { validate } from '../../middlewares/validate'
import asyncify from 'express-asyncify'

const router = asyncify(Router())

// login - user
router.post('/login', validate(loginSchema), login)

// login - admin
router.post('/login/admin', validate(loginSchema), adminLogin)

// create new user
router.post('/register', validate(registerSchema), register)

// logout
router.get('/logout', logout)

export default router
