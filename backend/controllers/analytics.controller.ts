// user analytics

import { NextFunction, Request, Response } from 'express'
import analyticsService from '../services/analytics.service'
import { OkResponse } from '../utils/success.response'

class AnalyticsController {
	async handleGetUserAnalytics(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		return new OkResponse({
			metaData: await analyticsService.handleGetUserAnalytics(),
		}).send(res)
	}

	async handleGetCourseAnalytics(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		return new OkResponse({
			metaData: await analyticsService.handleGetCourseAnalytics(),
		}).send(res)
	}

	async handleGetOrderAnalytics(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		return new OkResponse({
			metaData: await analyticsService.handleGetOrderAnalytics(),
		}).send(res)
	}
}

export default new AnalyticsController()
