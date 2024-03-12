import { NextFunction, Request, Response } from 'express'
import reviewService from '../services/review.service'
import { CreatedResponse } from '../utils/success.response'

class ReviewController {
	async handleAddReview(req: Request, res: Response, next: NextFunction) {
		return new CreatedResponse({
			metaData: await reviewService.handleAddReview(req.user?._id, req.body),
		}).send(res)
	}
}

export default new ReviewController()
