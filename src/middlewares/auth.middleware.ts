import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../utils/error/UnauthorizedError'
import { isValidToken, verifyToken } from '../utils/jwt'
import { ForbiddenError } from '../utils/error/ForbiddenError'
import { ROLES } from '../utils/roles'

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
    const role = req.body.user.user_role
    if (roles.includes(role)) {
      return next()
    }
    throw new ForbiddenError('You are not allowed')
  }
}

export const authPage = (req: Request, res: Response, next: NextFunction) => {
  // check if there is a user in the session
  if (!req.session.user) {
    return res.redirect('/login?error=You need to login first')
  }
  if (!isValidToken(req.session.user?.token)) {
    return res.redirect('/login?error=Expired token')
  }
  return next()
}

export const adminPage = (req: Request, res: Response, next: NextFunction) => {
  // check if there is a user in the session
  if (!req.session.user) {
    return res.redirect('/admin-login?error=You need to login as admin first')
  }
  if (!isValidToken(req.session.user?.token)) {
    return res.redirect('/admin-login?error=Expired token')
  }
  if (req.session.user.user_role !== ROLES.admin) {
    return res.redirect('/admin-login?error=You need to login as admin first')
  }
  return next()
}
