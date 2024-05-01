import { Router } from 'express'
import { login, logout, register } from '../../controllers/auth.controller'
import { loginSchema, registerSchema } from '../../validate/auth.schema'
import { validate } from '../../middlewares/validate'
import asyncify from 'express-asyncify'

const router = asyncify(Router())

router.post('/login', validate(loginSchema), login)
router.post('/register', validate(registerSchema), register)
router.get('/logout', logout)

export default router
