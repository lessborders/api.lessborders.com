import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from'morgan'

import config from'./config.js'
import { sequelize } from'./models/index.js'
import passport from './passport.js'
import router from './routes.js'

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(router);

app.use(express.static('./client/dist'))

sequelize
  .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
  .then(function (results) {
    sequelize.sync({ force: false })
  })
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })

export default app;