import 'express-session'

declare module 'express' {
  interface Request {
    user?: any
  }
}
