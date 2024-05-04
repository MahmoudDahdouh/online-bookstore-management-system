import {
  paginationSchema,
  idParamSchema,
  idBodySchema,
  searchAndFilterSchema,
} from './../../validate/global.schema'
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
import { createBookSchema, updateBookSchema } from '../../validate/book.schema'
import { requiredRole } from '../../middlewares/auth.middleware'
import { ROLES } from '../../utils/roles'

const router = asyncify(Router())

// create new book
router.post(
  '/',
  [validate(createBookSchema), requiredRole([ROLES.admin])],
  createBook
)
// get all books
router.get(
  '/',
  [validate(paginationSchema), validate(searchAndFilterSchema)],
  getAllBooks
)

// get book by id
router.get('/:id', validate(idParamSchema), getBookById)

// update book
router.patch(
  '/:id',
  [validate(updateBookSchema), requiredRole([ROLES.admin])],
  updateBook
)

// delete book
router.delete(
  '/',
  [validate(idBodySchema), requiredRole([ROLES.admin])],
  deleteBook
)

export default router
