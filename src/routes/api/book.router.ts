import {
  paginationSchema,
  idParamSchema,
  idBodySchema,
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

router.post(
  '/',
  [validate(createBookSchema), requiredRole([ROLES.admin])],
  createBook
)
router.get('/', validate(paginationSchema), getAllBooks)
router.get('/:id', validate(idParamSchema), getBookById)
router.patch(
  '/:id',
  [validate(updateBookSchema), requiredRole([ROLES.admin])],
  updateBook
)
router.delete(
  '/',
  [validate(idBodySchema), requiredRole([ROLES.admin])],
  deleteBook
)

export default router
