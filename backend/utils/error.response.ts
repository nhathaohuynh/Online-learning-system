const statusCodes = require('./statusCodes')
const reasonError = require('./reasonPhrases')

export class ErrorResponse extends Error {
	status: number
	constructor(message: string, status: number) {
		super(message)
		this.status = status
	}
}

export class Conflcit extends ErrorResponse {
	constructor(
		message: string = reasonError.CONFLICT,
		status: number = statusCodes.CONFLICT,
	) {
		super(message, status)
	}
}

export class BadRequest extends ErrorResponse {
	constructor(
		message: string = reasonError.BAD_REQUEST,
		status: number = statusCodes.BAD_REQUEST,
	) {
		super(message, status)
	}
}

export class Forbidden extends ErrorResponse {
	constructor(message = reasonError.FORBIDDEN, status = statusCodes.FORBIDDEN) {
		super(message, status)
	}
}

export class TooManyRequest extends ErrorResponse {
	constructor(
		message: string = reasonError.TOO_MANY_REQUESTS,
		status: number = statusCodes.TOO_MANY_REQUESTS,
	) {
		super(message, status)
	}
}

export class Unauthorized extends ErrorResponse {
	constructor(
		message: string = reasonError.UNAUTHORIZED,
		status: number = statusCodes.UNAUTHORIZED,
	) {
		super(message, status)
	}
}
