import { Router } from 'express'
import { checkout } from '../../controllers/order.controller'
import asyncify from 'express-asyncify'

const router = asyncify(Router())

router.post('/checkout', checkout)

export default router
