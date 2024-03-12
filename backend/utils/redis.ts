import { Redis } from 'ioredis'
import { env } from '../config/env.config'
import { BadRequest } from './error.response'

const redisClient = () => {
	if (env.REDIS_URL) {
		console.log('Connected to redis success')
		return env.REDIS_URL
	}
	throw new BadRequest('Redis connection failed!')
}

const redis = new Redis(redisClient())

export default redis
