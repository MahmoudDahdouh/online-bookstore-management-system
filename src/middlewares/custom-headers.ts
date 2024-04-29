import { NextFunction, Request, Response } from 'express'

export default function addCustomHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.setHeader('X-Client-Type', 'web')
  next()
}
