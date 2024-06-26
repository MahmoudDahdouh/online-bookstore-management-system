import express from 'express'
import path from 'path'

import ErrorHandler from './middlewares/error-handler'
import { clientErrorHandler } from './middlewares/client-error-handler'
import Config from './config/environment'
import apiRouter from './routes/api'
import viewsRouter from './routes/views'
import addCustomHeader from './middlewares/custom-headers'
import { syncDatabase } from './db/config/connect'
import session from 'express-session'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// use static files
app.use(express.static(__dirname + '/public'))

// set custom header
app.use(addCustomHeader)

// Set up session middleware
app.use(
  session({
    secret: Config.server.session_secret_key,
    resave: true,
    saveUninitialized: true,
  })
)

// sync Database
syncDatabase({})

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
