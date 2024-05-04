import CustomError from './CustomError'

export class ForbiddenError extends CustomError {
  message: string
  constructor(message: string = 'Forbidden') {
    super(403, message)
    this.message = message
  }
}
