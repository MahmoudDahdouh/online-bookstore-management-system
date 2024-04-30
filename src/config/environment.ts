import dotenv from 'dotenv'
dotenv.config()

const requiredEnvVars = [
  // Server
  'PORT',
  'NODE_ENV',
  // API
  'API_VERSION',
  // JWT
  'JWT_ACCESS_SECRET_KEY',
  'JWT_REFRESH_SECRET_KEY',
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
  jwt: {
    access_secret_key: process.env.JWT_ACCESS_SECRET_KEY || '',
    refresh_secret_key: process.env.JWT_REFRESH_SECRET_KEY,
  },
  api: {
    version: process.env.API_VERSION,
  },
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
