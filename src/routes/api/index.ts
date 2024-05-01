import { Router } from 'express'
import authRouter from './auth.router'
import bookRouter from './book.router'
import asyncHandler from '../../utils/async-handler'

const router = Router()

// auth routes
router.use('/auth', authRouter)

// book routes
router.use('/book', asyncHandler(bookRouter))

export default router
