import { Sequelize } from 'sequelize'
import Config from '../../config/environment'

const sequelize = new Sequelize(Config.database.dev.uri, {
  define: {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'update_at',
  },
})
export async function syncDatabase({
  force,
  alter,
  logging,
}: {
  force?: boolean
  alter?: boolean
  logging?: boolean
}) {
  console.log('Start database connection.')
  try {
    await sequelize.sync({ force, alter, logging })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
export async function checkConnection() {
  console.log('Start database connection.')
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default sequelize
