import { Request, Response } from 'express'

export function login(req: Request, res: Response) {
  res.send('login')
}
export function register(req: Request, res: Response) {
  res.send('register')
}
export function logout(req: Request, res: Response) {
  res.send('logout')
}
