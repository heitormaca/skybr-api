import path from 'path'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import nocache from 'nocache'
import { errorHandler } from './middleware/error.middleware'
import { notFoundHandler } from './middleware/not-found.middleware'
import { usersRouter } from './domains/users/users.router'

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) })

const requiredEnvs = ['PORT', 'CLIENT_URL', 'DATABASE_URL']
for (const key of requiredEnvs) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

const PORT = parseInt(process.env.PORT!, 10)
const CLIENT_URL = process.env.CLIENT_URL

const app = express()
const apiRouter = express.Router()

app.use(express.json())
app.set('json spaces', 2)

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        'default-src': ["'none'"],
        'frame-ancestors': ["'none'"],
      },
    },
    frameguard: {
      action: 'deny',
    },
  }),
)

app.use(nocache())

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['GET'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400,
  }),
)

app.use((req, res, next) => {
  res.contentType('application/json; charset=utf-8')
  next()
})

app.use('/api', apiRouter)
apiRouter.use('/users', usersRouter)

app.use(errorHandler)
app.use(notFoundHandler)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} [${env}]`)
})
