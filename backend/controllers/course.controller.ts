import { NextFunction, Request, Response } from 'express'
import courseService from '../services/course.service'
import { BadRequest } from '../utils/error.response'
import { CreatedResponse, OkResponse } from '../utils/success.response'

class CourseController {
	async hanleCreateNewCourse(req: Request, res: Response, next: NextFunction) {
		return new CreatedResponse({
			metaData: await courseService.handleCreateNewCourse(req.body, next),
		}).send(res)
	}

	async handleEditCourse(req: Request, res: Response, next: NextFunction) {
		const data = await courseService.handleEditCourse(
			req.params.id,
			req.body,
			next,
		)

		if (!data) return next(new BadRequest('Occuring with updating course.'))
		else {
			return new OkResponse({
				metaData: data,
			}).send(res)
		}
	}

	async getSingleCourse(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await courseService.getSingleCourse(req.params.id),
		}).send(res)
	}

	async getAllCourse(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await courseService.getAllCourse(),
		}).send(res)
	}

	async getCourseValidUser(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await courseService.getCourseValidUser(
				req.user?._id,
				req.params.id,
			),
		}).send(res)
	}

	async getAllCourses(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await courseService.getAllCourses(),
		}).send(res)
	}

	async deleteCourse(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await courseService.deleteCourse(req.params.id),
		}).send(res)
	}
}

export default new CourseController()
