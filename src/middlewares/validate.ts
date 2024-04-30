import { Schema, ValidationError } from 'yup'
import asyncHandler from '../utils/async-handler'
import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../utils/error/BadRequestError'

export function validate(schema: Schema<any>) {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log('validation test')

        const data = await schema.validate({
          body: req.body,
          query: req.query,
          params: req.params,
        })

        console.log({ ...data })

        // replace with the validated data
        req.body = { ...data.body }
        req.query = { ...data.query }
        req.params = { ...data.params }
        next()
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new BadRequestError(error.errors[0])
        }
        throw new BadRequestError()
      }
    }
  )
}
