import { Router, Request, Response } from 'express'
import axios from '../../config/axios'

const router = Router()

// get books list
router.get('/', async (req: Request, res: Response) => {
  await axios
    .get('/book', {
      headers: { Authorization: `Bearer ${req.session.user.token}` },
    })
    .then((response) => {
      console.log({ books: response.data.books })
      res.render('pages/books', {
        title: 'home',
        user: req.session.user,
        books: response.data.books,
      })
    })
    .catch((error) => {
      const { data } = error.response
      return res.render('pages/books', {
        title: 'home',
        user: req.session.user,
        error: data.message,
      })
    })
})

// get book detail by id
router.get('/:id', async (req: Request, res: Response) => {
  await axios
    .get(`/book/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.user.token}` },
    })
    .then((response) => {
      res.render('pages/book_detail', {
        title: 'book detail',
        user: req.session.user,
        book: response.data.book,
      })
    })
    .catch((error) => {
      const { data } = error.response
      return res.render('pages/book_detail', {
        title: 'book detail',
        user: req.session.user,
        error: data.message,
      })
    })
})

export default router
