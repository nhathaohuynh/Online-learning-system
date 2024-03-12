import winston from 'winston'
const { combine, timestamp, printf, align } = winston.format

const today = new Date()

const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || 'debug',
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD hh-mm-ss.SSS',
		}),
		align(),
		printf(
			(info: any) => `[${info?.timestamp}]-${info?.level}:${info?.message}`,
		),
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			dirname: 'logs',
			filename: `${today.getDate()}-${
				today.getMonth() + 1
			}-${today.getFullYear()}.log`,
		}),
	],
})

export default logger
