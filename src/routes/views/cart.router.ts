import { Request, Response, Router } from 'express'

const router = Router()

// cart
router.get('/', async (req: Request, res: Response) => {
  res.render('pages/cart', {
    title: 'cart',
    user: req.session.user,
  })
})

// checkout
router.get('/checkout', async (req: Request, res: Response) => {
  res.render('pages/checkout', {
    title: 'checkout',
    user: req.session.user,
  })
})

export default router
