import CustomError from './CustomError'

export class ConflictError extends CustomError {
  message: string
  constructor(message: string = 'Conflict') {
    super(409, message)
    this.message = message
  }
}
