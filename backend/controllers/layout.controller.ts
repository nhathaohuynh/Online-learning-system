import { NextFunction, Request, Response } from 'express'
import layoutService from '../services/layout.service'
import { OkResponse } from '../utils/success.response'

class LayoutController {
	async createLayout(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			message: 'Layout created successfully',
			metaData: await layoutService.createLayout(req.body),
		}).send(res)
	}

	async editLayout(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			message: 'Layout edited successfully',
			metaData: await layoutService.editLayout(req.body),
		}).send(res)
	}
}

export default new LayoutController()
