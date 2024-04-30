import { Request, Response } from 'express'
import User from '../db/models/User'
import bcrypt from 'bcrypt'
import { BadRequestError } from '../utils/error/BadRequestError'
import { ConflictError } from '../utils/error/ConflictError'
import { generateToken } from '../utils/jwt'
import StatusResponse from '../utils/StatusResponse'

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  // check if the email is exist in the database
  const user = await User.findOne({
    where: {
      email,
    },
  })

  if (!user) {
    throw new BadRequestError('Email or password is incorrect')
  }

  // check if the password is correct
  const isPasswordMatch = await bcrypt.compare(password, user.password_hash)

  if (!isPasswordMatch) {
    throw new BadRequestError('Email or password is incorrect')
  }

  // generate new token
  const token = generateToken(
    { id: user.id, role: user.user_role },
    {
      expiresIn: '30d',
    }
  )

  // return the user data without the password
  return res.json({
    ...StatusResponse(),
    user,
    access_token: token,
  })
}
export function register(req: Request, res: Response) {
  res.send('register')
}
export function logout(req: Request, res: Response) {
  res.send('logout')
}
