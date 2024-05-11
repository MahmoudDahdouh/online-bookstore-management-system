import { Router } from 'express'

const router = Router()

// admin page
router.get('/', (req, res) => {
  res.render('pages/admin', { title: 'admin', user: req.session.user })
})

export default router
