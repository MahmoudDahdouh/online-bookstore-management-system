import { Router } from 'express'
import { checkout } from '../../controllers/order.controller'

const router = Router()

router.post('/checkout', checkout)

export default router
