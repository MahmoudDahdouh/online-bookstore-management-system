import { Router } from 'express'
import { login, logout, register } from '../../controllers/auth.controller'
import asyncHandler from '../../utils/async-handler'
import { loginSchema, registerSchema } from '../../validate/auth.schema'
import { validate } from '../../middlewares/validate'

const router = Router()

router.post('/login', validate(loginSchema), asyncHandler(login))
router.post('/register', asyncHandler(register))
router.get('/logout', asyncHandler(logout))

export default router
