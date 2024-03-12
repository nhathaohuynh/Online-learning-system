'use strict'

import { Response } from 'express'
import logger from '../logs/winston.logger'
import { TypeSuccessResponse } from './types'
const reasonStatusCodes = require('./reasonPhrases')
const statusCodes = require('./statusCodes')

class SuccessResponse {
	message: string
	status: number
	code: number
	metaData: any

	constructor({
		message = reasonStatusCodes.OK,
		status = statusCodes.OK,
		metaData = {},
	}: TypeSuccessResponse) {
		this.message = message
		this.status = status
		this.code = 1
		this.metaData = metaData

		logger.info(`${this.status} - ${this.message}`)
	}

	send(res: Response) {
		return res.status(this.status).json(this)
	}
}

export class OkResponse extends SuccessResponse {
	options: any
	constructor({
		message = reasonStatusCodes.OK,
		status = statusCodes.OK,
		metaData = {},
		options = {},
	}: TypeSuccessResponse & { options?: any }) {
		super({ message, metaData, status })
		this.options = options
	}
}

export class CreatedResponse extends SuccessResponse {
	options: any
	constructor({
		message = reasonStatusCodes.CREATED,
		status = statusCodes.CREATED,
		metaData = {},
		options = {},
	}: TypeSuccessResponse & { options?: any }) {
		super({ message, metaData, status })
		this.options = options
	}
}

module.exports = {
	OkResponse,
	CreatedResponse,
}
