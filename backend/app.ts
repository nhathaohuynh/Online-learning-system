import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { env } from './config/env.config'
import notFound from './middlewares/NotFound'
import errorHandler from './middlewares/errorHandler'
import { components } from './swaggerComponents'
import db from './utils/db'

export const app = express()

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Online learning system API with Swagger',
			version: '1.0.0',
		},
		components,
	},
	// 	// Path to the API docs
	apis: ['./routes/*.ts'],
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// body parser

app.use(express.json({ limit: '50mb' }))
app.use(morgan('dev'))
app.use(helmet())

// cookie parser

app.use(cookieParser())
app.use(
	cors({
		origin: env.ORIGIN,
	}),
)

// connect db
db.connect()

//testing route

app.use('/api/v1/OnlineLS', require('./routes'))

// not found

app.use(notFound)

// handle error

app.use(errorHandler)
