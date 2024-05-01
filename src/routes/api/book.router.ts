import { Router } from 'express'
import asyncHandler from '../../utils/async-handler'
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from '../../controllers/book.controller'

const router = Router()

router.post('/', createBook)
router.get('/', getAllBooks)
router.get('/:id', getBookById)
router.patch('/:id', updateBook)
router.delete('/', deleteBook)

export default router
