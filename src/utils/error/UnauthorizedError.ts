import CustomError from './CustomError'

export class UnauthorizedError extends CustomError {
  message: string
  constructor(message: string = 'Unauthorized') {
    super(401, message)
    this.message = message
  }
}
