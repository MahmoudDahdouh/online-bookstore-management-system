import express from 'express'
import ErrorHandler from './middlewares/error-handler'
import { NotFoundError } from './utils/error/NotFoundError'
import { clientErrorHandler } from './middlewares/client-error-handler'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  throw new NotFoundError('This is an error')
  res.send('Hello, TypeScript with Express!')
})

// Error handler
app.use(ErrorHandler)

export default app
