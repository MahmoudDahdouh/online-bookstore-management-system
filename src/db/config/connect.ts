import { Sequelize } from 'sequelize'
import Config from '../../config/environment'

const sequelize = new Sequelize(Config.database.dev.uri)

export const checkConnection = async () => {
  console.log('Start database connection.')
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default sequelize
