import CustomError from './CustomError'

export class BadRequestError extends CustomError {
  message: string
  constructor(message: string = 'Bad Request') {
    super(400, message)
    this.message = message
  }
}
