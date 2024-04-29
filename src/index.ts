import app from './app'
import Config from './config/environment'

const initServer = async () => {
  app.listen(Config.server.port, () => {
    console.log(`Server is running on http://localhost:${Config.server.port}`)
  })
}

initServer()
