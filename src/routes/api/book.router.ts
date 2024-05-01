import { Router } from 'express'
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from '../../controllers/book.controller'
import asyncify from 'express-asyncify'

const router = asyncify(Router())

router.post('/', createBook)
router.get('/', getAllBooks)
router.get('/:book_id', getBookById)
router.patch('/:id', updateBook)
router.delete('/', deleteBook)

export default router
