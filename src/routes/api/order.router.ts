import { Router } from 'express'
import { checkout, getUserOrders } from '../../controllers/order.controller'
import asyncify from 'express-asyncify'

const router = asyncify(Router())

router.post('/checkout', checkout)
router.get('/', getUserOrders)

export default router
