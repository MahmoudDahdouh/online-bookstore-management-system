import { Request, Response } from 'express'
import Book from '../db/models/Book'
import { NotFoundError } from '../utils/error/NotFoundError'
import StatusResponse from '../utils/StatusResponse'
import { ConflictError } from '../utils/error/ConflictError'
import { Op } from 'sequelize'

/**
 * create a new book
 * POST
 * /book
 * @body title, description, author,
 * genre, language, isbn, price,
 * page_count, published_date
 */
export async function createBook(req: Request, res: Response) {
  const {
    title,
    description,
    author,
    genre,
    language,
    isbn,
    price,
    page_count,
    published_date,
  } = req.body

  const [book, isCreated] = await Book.findOrCreate({
    where: { isbn },
    defaults: {
      title,
      description,
      author,
      genre,
      language,
      isbn,
      price,
      page_count,
      published_date,
    },
  })
  if (!isCreated) {
    console.log({ book })
    throw new ConflictError('Book is already exist, try new ISBN number')
  }

  res.send({ ...StatusResponse(201, 'new book created'), book })
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
  const search_query = req.query.search_query

  const { rows: books, count } = await Book.findAndCountAll({
    limit: page_size,
    offset: (page - 1) * page_size,
    where: {
      is_deleted: false,
      [Op.or]: [
        { title: { [Op.like]: '%' + search_query + '%' } },
        { author: { [Op.like]: '%' + search_query + '%' } },
        { genre: { [Op.like]: '%' + search_query + '%' } },
        { description: { [Op.like]: '%' + search_query + '%' } },
      ],
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
 * /book/:id
 * @param id
 */
export async function getBookById(req: Request, res: Response) {
  const { id: book_id } = req.params

  const book = await Book.findByPk(book_id)
  if (!book) {
    throw new NotFoundError('Book is not found')
  }
  res.json({ ...StatusResponse(), book })
}

/**
 * update book
 * PATCH
 * /book/:id
 * @param id
 * @body title, description, author,
 * genre, language, isbn, price,
 * page_count, published_date
 */
export async function updateBook(req: Request, res: Response) {
  const id = req.params.id
  const {
    title,
    description,
    author,
    genre,
    language,
    isbn,
    price,
    page_count,
    published_date,
  } = req.body
  const book = await Book.findOne({ where: { id } })
  if (!book) {
    throw new NotFoundError('Book is not found')
  }

  await book.update({
    title,
    description,
    author,
    genre,
    language,
    isbn,
    price,
    page_count,
    published_date,
  })

  res.json({ ...StatusResponse(), book })
}

/**
 * delete book
 * DELETE
 * /book
 * @body id
 */
export async function deleteBook(req: Request, res: Response) {
  const id = req.body.id
  const book = await Book.findOne({ where: { id } })
  if (!book || book.is_deleted === true) {
    throw new NotFoundError('Book is not found')
  }

  // soft delete the book
  await book.update(
    { is_deleted: true },
    {
      where: id,
    }
  )

  res.json({ ...StatusResponse(200, 'book deleted'), book })
}
