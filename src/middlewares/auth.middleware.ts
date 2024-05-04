import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../utils/error/UnauthorizedError'
import { verifyToken } from '../utils/jwt'
import { ForbiddenError } from '../utils/error/ForbiddenError'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError('Authorization required')
  }

  const accessToken = authorization.split(' ')[1]
  const payload = verifyToken(accessToken)
  req.body.user = payload
  next()
}

export const requiredRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.body.user.role
    if (role in roles) {
      next()
    }
    throw new ForbiddenError('You are not allowed')
  }
}
