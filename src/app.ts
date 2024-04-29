import express from 'express'
import path from 'path'

import ErrorHandler from './middlewares/error-handler'
import { NotFoundError } from './utils/error/NotFoundError'
import { clientErrorHandler } from './middlewares/client-error-handler'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set the view engine to ejs
app.set('view engine', 'ejs')
// Set views directory
app.set('views', path.join(__dirname, 'views'))

// Hello world
app.get('/', (req, res) => {
  res.render('pages/index', {})
})

// client error handler
app.use(clientErrorHandler)

// Error handler
app.use(ErrorHandler)

export default app
