import { TypeEnv } from '../utils/types'

require('dotenv').config()

export const env: TypeEnv = {
	PORT: process.env.PORT,
	ORIGIN: process.env.ORIGIN,
	MONGO_URL: process.env.MONGO_URL,
	CLOUD_NAME: process.env.CLOUD_NAME,
	CLOUD_API_KEY: process.env.CLOUD_API_KEY,
	CLOUD_SECRET_KEY: process.env.CLOUD_SECRET_KEY,
	ACTIVATION_SECRET: process.env.CLOUD_SECRET_KEY,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_POR: process.env.SMTP_HOST,
	SMTP_SERVICE: process.env.SMTP_HOST,
	SMTP_MAIL: process.env.SMTP_HOST,
	SMTP_PASSWORD: process.env.SMTP_HOST,
	MONGO_URL_LOCAL: process.env.MONGO_URL_LOCAL,
	EXPIRES_ACCESS_TOKEN: process.env.EXPIRES_ACCESS_TOKEN,
	EXPIRES_REFRESH_TOKEN: process.env.EXPIRES_REFRESH_TOKEN,
	NODE_ENV: process.env.NODE_ENV,
	REDIS_URL: process.env.REDIS_URL,
	ADMIN_ROLE: process.env.ADMIN_ROLE,
	USER_ROLE: process.env.USER_ROLE,
}
