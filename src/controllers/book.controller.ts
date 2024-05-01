import { Request, Response } from 'express'

export async function createBook(req: Request, res: Response) {
  res.send('create book')
}
export async function getAllBooks(req: Request, res: Response) {
  res.send('get all books')
}
export async function getBookById(req: Request, res: Response) {
  res.send(`get book number ${req.params.id}`)
}
export async function updateBook(req: Request, res: Response) {
  res.send(`update book number ${req.params.id}`)
}
export async function deleteBook(req: Request, res: Response) {
  res.send(`delete book number ${req.body.book_id}`)
}
