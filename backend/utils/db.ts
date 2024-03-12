import mongoose from 'mongoose'
import { env } from '../config/env.config'

class Database {
	private static instance: Database
	private constructor() {}

	connect() {
		if (1 === 1) {
			mongoose.set('debug', true)
			mongoose.set('debug', { color: true })
		}

		mongoose
			.connect(env.MONGO_URL_LOCAL as string)
			.then((_: any) => {
				console.log('Connected to mongodb success')
			})
			.catch((err) => console.log('Error connect', err))
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database()
		}

		return this.instance
	}
}

const db = Database.getInstance()

export default db
