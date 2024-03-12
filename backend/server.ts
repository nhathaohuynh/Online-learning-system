import { v2 as cloudinary } from 'cloudinary'
import { app } from './app'
import { env } from './config/env.config'
// couldinary config

cloudinary.config({
	cloud_name: env.CLOUD_NAME,
	api_key: env.CLOUD_API_KEY,
	api_secret: env.CLOUD_SECRET_KEY,
})

app.listen(env.PORT, () => {
	console.log(`Server is connect with port ${env.PORT}`)
})
