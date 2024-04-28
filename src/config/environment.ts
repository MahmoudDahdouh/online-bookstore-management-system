import dotenv from 'dotenv'
dotenv.config()

const requiredEnvVars = [
  // Server
  'PORT',
  'NODE_ENV',
  // Database
  // dev
  'DEV_DB_URI',
]

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is not defined`)
  }
})

const Config = {
  server: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  database: {
    dev: {
      uri: process.env.DEV_DB_URI || '',
    },
  },
}

export default Config
