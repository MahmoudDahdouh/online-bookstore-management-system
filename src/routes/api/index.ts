import { Router } from 'express'
import authRouter from './auth.router'
import bookRouter from './book.router'

const router = Router()

// auth routes
router.use('/auth', authRouter)

// book routes
router.use('/book', bookRouter)

export default router
