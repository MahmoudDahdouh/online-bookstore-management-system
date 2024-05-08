import jwt from 'jsonwebtoken'
import Config from '../config/environment'
import { UnauthorizedError } from './error/UnauthorizedError'

export function generateToken(payload: object, options: object) {
  return jwt.sign(payload, Config.jwt.access_secret_key, options)
}

export function verifyToken(accessToken: string) {
  try {
    return jwt.verify(accessToken, Config.jwt.access_secret_key)
  } catch (error) {
    throw new UnauthorizedError('Expired token')
  }
}

export function isValidToken(accessToken: string) {
  try {
    jwt.verify(accessToken, Config.jwt.access_secret_key)
    return true
  } catch (error) {
    return false
  }
}
