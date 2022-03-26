import dotenv from 'dotenv'
dotenv.config()

const config = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'lb_cloud',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}

export default config