import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../utils/error/NotFoundError'

export const clientErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new NotFoundError('Page not found')
}
