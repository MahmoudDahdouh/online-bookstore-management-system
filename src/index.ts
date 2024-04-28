// src/index.ts
import express from 'express'
import Config from './config/environment'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!')
})

app.listen(Config.server.port, () => {
  console.log(`Server is running on http://localhost:${Config.server.port}`)
})
