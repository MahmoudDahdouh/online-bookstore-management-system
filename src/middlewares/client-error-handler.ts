import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../utils/error/NotFoundError'

export const clientErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.table(req.headers)
  if (res.getHeader('X-Client-Type') === 'web') {
    res.render('pages/404')
  }
  throw new NotFoundError('Page not found')
}
