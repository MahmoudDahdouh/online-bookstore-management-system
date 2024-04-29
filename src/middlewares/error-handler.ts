import { NextFunction, Request, Response } from 'express'
import CustomError from '../utils/error/CustomError'
import asyncHandler from '../utils/async-handler'

export default function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error)

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      status_code: error.statusCode,
    })
  }
  // Unexpected error
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    status_code: 500,
  })
}
