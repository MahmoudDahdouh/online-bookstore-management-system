import CustomError from './CustomError'

export class NotFoundError extends CustomError {
  message: string
  constructor(message: string = 'Not Found') {
    super(404, message)
    this.message = message
  }
}
