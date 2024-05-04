import { Router } from 'express'
import authRouter from './auth.router'
import bookRouter from './book.router'
import { requireAuth } from '../../middlewares/auth.middleware'

const router = Router()

// auth routes
router.use('/auth', authRouter)

// book routes
router.use('/book', [requireAuth], bookRouter)

export default router
