import { NextFunction, Request, Response } from 'express'
import questionService from '../services/question.service'
import { CreatedResponse } from '../utils/success.response'

class QuestionController {
	async handleAddQuestion(req: Request, res: Response, next: NextFunction) {
		return new CreatedResponse({
			metaData: await questionService.handleAddQuestion(
				req.user?._id,
				req.body,
			),
		}).send(res)
	}

	async handleAnwserQuestion(req: Request, res: Response, next: NextFunction) {
		return new CreatedResponse({
			metaData: await questionService.handleReplyQuestion(
				req.user?._id,
				req.body,
			),
		}).send(res)
	}
}

export default new QuestionController()
