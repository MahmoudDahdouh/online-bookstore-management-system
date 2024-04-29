import { Router } from 'express'

const router = Router()

// index page
router.get('/', (req, res) => {
  res.render('pages/index', {})
})

export default router
