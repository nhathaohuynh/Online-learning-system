import { NextFunction, Request, Response } from 'express'
import dataCourseService from '../services/dataCourse.service'
import { OkResponse } from '../utils/success.response'

class DataCourseController {
	async handleUpdateDataCourse(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		return new OkResponse({
			metaData: await dataCourseService.handleUpdateDataCourse(
				req.params.id,
				req.body,
			),
		}).send(res)
	}
}

export default new DataCourseController()
