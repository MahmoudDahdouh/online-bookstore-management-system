import { NextFunction, Request, Response } from 'express'
import CustomError from '../utils/error/CustomError'
import StatusResponse from '../utils/StatusResponse'

export default function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error)

  if (error instanceof CustomError) {
    res
      .status(error.statusCode)
      .json({ ...StatusResponse(error.statusCode, error.message, false) })
  }
  // Unexpected error
  res.status(500).json({
    ...StatusResponse(500, 'Internal server error', false),
  })
}
