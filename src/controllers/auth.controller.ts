import { Request, Response } from 'express'
import User from '../db/models/User'
import bcrypt from 'bcrypt'
import { BadRequestError } from '../utils/error/BadRequestError'
import { ConflictError } from '../utils/error/ConflictError'
import { generateToken } from '../utils/jwt'
import StatusResponse from '../utils/StatusResponse'
import { Op } from 'sequelize'
import { ROLES } from '../utils/roles'

/**
 * login
 * login using email and password
 * POST
 * /auth/login
 */
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
  const { password_hash, ...restUserData } = user.dataValues
  return res.json({
    ...StatusResponse(),
    restUserData,
    access_token: token,
  })
}

/**
 * admin login
 * login using email and password
 * POST
 * /auth/login/admin
 */
export async function adminLogin(req: Request, res: Response) {
  const { email, password } = req.body

  // check if the email is exist in the database
  const user = await User.findOne({
    where: {
      email,
      user_role: ROLES.admin,
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
  const { password_hash, ...restUserData } = user.dataValues
  return res.json({
    ...StatusResponse(),
    restUserData,
    access_token: token,
  })
}

/**
 * register
 * create new user
 * POST
 * /auth/register
 */
export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body

  // check if the email or username is exist in the database

  const user = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  })

  if (user && user.email === email) {
    throw new ConflictError('Email already exist')
  }

  if (user && user.username === username) {
    throw new ConflictError('Username already exist')
  }

  // register new user
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({
    username,
    email,
    password_hash: hashedPassword,
  })
  // generate new token
  const token = generateToken(
    { id: newUser.id, role: newUser.user_role },
    {
      expiresIn: '30d',
    }
  )
  const { password_hash, ...restUserData } = newUser.dataValues
  res.json({
    ...StatusResponse(201, 'New user created'),
    user: restUserData,
    access_token: token,
  })
}
/**
 * createAdmin
 * create a new admin user
 * POST
 * /auth/register/admin
 */
export async function createAdmin(req: Request, res: Response) {
  const { username, email, password } = req.body

  // check if the email or username is exist in the database
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  })

  if (user && user.email === email) {
    throw new ConflictError('Email already exist')
  }

  if (user && user.username === username) {
    throw new ConflictError('Username already exist')
  }

  // register new user
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({
    username,
    email,
    password_hash: hashedPassword,
    user_role: ROLES.admin,
  })
  // generate new token
  const token = generateToken(
    { id: newUser.id, role: newUser.user_role },
    {
      expiresIn: '30d',
    }
  )
  const { password_hash, ...restUserData } = newUser.dataValues
  res.json({
    ...StatusResponse(201, 'New admin created'),
    user: restUserData,
    access_token: token,
  })
}
export function logout(req: Request, res: Response) {
  res.send('logout')
}
