import { Request, Response } from 'express'
import Book from '../db/models/Book'
import { NotFoundError } from '../utils/error/NotFoundError'
import StatusResponse from '../utils/StatusResponse'

export async function createBook(req: Request, res: Response) {
  res.send('create book')
}

/**
 * get all books
 * GET
 * /book
 * @query page
 * @query page_size
 */
export async function getAllBooks(req: Request, res: Response) {
  const page = Number(req.query.page)
  const page_size = Number(req.query.page_size)

  const { rows: books, count } = await Book.findAndCountAll({
    limit: page_size,
    offset: (page - 1) * page_size,
    where: {
      is_deleted: false,
    },
    order: [['created_at', 'desc']],
  })

  res.json({
    ...StatusResponse(),
    books,
    number_of_results: books.length,
    number_of_books: count,
    page,
    page_size,
  })
}

/**
 * get book by id
 * GET
 * /book
 * @param id
 */
export async function getBookById(req: Request, res: Response) {
  const { id: book_id } = req.params

  const book = await Book.findByPk(book_id)
  if (!book) {
    throw new NotFoundError('Book is not found')
  }
  res.json({ ...StatusResponse, book })
}

export async function updateBook(req: Request, res: Response) {
  res.send(`update book number ${req.params.id}`)
}
export async function deleteBook(req: Request, res: Response) {
  res.send(`delete book number ${req.body.book_id}`)
}
