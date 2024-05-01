import { paginationSchema } from './../../validate/global.schema'
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
import { idParamSchema } from '../../validate/global.schema'

const router = asyncify(Router())

router.post('/', createBook)
router.get('/', validate(paginationSchema), getAllBooks)
router.get('/:id', validate(idParamSchema), getBookById)
router.patch('/:id', updateBook)
router.delete('/', deleteBook)

export default router
