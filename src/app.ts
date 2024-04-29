import express, { NextFunction, Request, Response } from 'express'
import path from 'path'

import ErrorHandler from './middlewares/error-handler'
import { NotFoundError } from './utils/error/NotFoundError'
import { clientErrorHandler } from './middlewares/client-error-handler'
import Config from './config/environment'
import apiRouter from './routes/api'
import viewsRouter from './routes/views'
import addCustomHeader from './middlewares/custom-headers'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// set custom header
app.use(addCustomHeader)

// set the view engine to ejs
app.set('view engine', 'ejs')
// Set views directory
app.set('views', path.join(__dirname, 'views'))

// API routes
app.use(`/api/v${Config.api.version}/`, apiRouter)

// Views routes
app.use(`/`, viewsRouter)

// client error handler
app.use(clientErrorHandler)

// Error handler
app.use(ErrorHandler)

export default app
