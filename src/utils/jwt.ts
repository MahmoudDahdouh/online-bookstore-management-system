import jwt from 'jsonwebtoken'
import Config from '../config/environment'

export function generateToken(payload: object, options: object) {
  return jwt.sign(payload, Config.jwt.access_secret_key, options)
}
