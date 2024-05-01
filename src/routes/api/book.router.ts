import { paginationSchema, idParamSchema } from './../../validate/global.schema'
import { Router } from 'express'
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from '../../controllers/book.controller'
import asyncify from 'express-asyncify'
import { validate } from '../../middlewares/validate'
import { createBookSchema } from '../../validate/book.schema'

const router = asyncify(Router())

router.post('/', validate(createBookSchema), createBook)
router.get('/', validate(paginationSchema), getAllBooks)
router.get('/:id', validate(idParamSchema), getBookById)
router.patch('/:id', updateBook)
router.delete('/', deleteBook)

export default router
