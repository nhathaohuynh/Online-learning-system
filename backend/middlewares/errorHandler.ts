import { NextFunction, Request, Response } from 'express'
import logger from '../logs/winston.logger'

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const message = err.message || 'Server Internal '
	const status = err.status || 500

	logger.error(`${req.method} - ${req.url} - ${status} - ${message}`)

	return res.status(status).json({
		message,
		code: -1,
		error: true,
		stack: err.stack,
	})
}

export default errorHandler
