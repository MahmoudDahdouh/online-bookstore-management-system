import { Request, Response } from 'express'
import Book from '../db/models/Book'
import { NotFoundError } from '../utils/error/NotFoundError'
import StatusResponse from '../utils/StatusResponse'

export async function createBook(req: Request, res: Response) {
  res.send('create book')
}
export async function getAllBooks(req: Request, res: Response) {
  res.send('get all books')
}
/**
 * get book by id
 * GET
 * /book/:id
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
