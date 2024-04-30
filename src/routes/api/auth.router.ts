import { Router } from 'express'
import { login, logout, register } from '../../controllers/auth.controller'
import asyncHandler from '../../utils/async-handler'

const router = Router()

router.post('/login', asyncHandler(login))
router.post('/register', asyncHandler(register))
router.get('/logout', asyncHandler(logout))

export default router
