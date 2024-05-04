import { Router } from 'express'
import {
  adminLogin,
  login,
  logout,
  register,
  createAdmin,
} from '../../controllers/auth.controller'
import { loginSchema, registerSchema } from '../../validate/auth.schema'
import { validate } from '../../middlewares/validate'
import asyncify from 'express-asyncify'
import { requireAuth, requiredRole } from '../../middlewares/auth.middleware'
import { ROLES } from '../../utils/roles'

const router = asyncify(Router())

// login - user
router.post('/login', validate(loginSchema), login)

// login - admin
router.post('/login/admin', validate(loginSchema), adminLogin)

// create new user
router.post('/register', validate(registerSchema), register)

// create new admin
router.post(
  '/register/admin',
  [validate(registerSchema), requireAuth, requiredRole([ROLES.admin])],
  createAdmin
)

// logout
router.get('/logout', logout)

export default router
