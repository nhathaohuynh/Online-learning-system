import { IBodyUpdateCourse, ICreateCourse } from '../../utils/types'
import courseModel from '../course.model'

export const createNewCourse = async (payload: ICreateCourse) => {
	return await courseModel.create(payload)
}

export const findCourseById = async (courseId: string) => {
	return await courseModel.findById(courseId).populate('thumbnail')
}

export const findCourseByIdAndPopulate = async (
	courseId: string,
	excludeFields?: string,
) => {
	return await courseModel
		.findById(courseId)
		.populate('thumbnail')
		.populate('dataCourse', excludeFields)
		.lean()
}

export const findCourseByIdAndUpdate = async (
	courseId: string,
	payload: IBodyUpdateCourse,
): Promise<any> => {
	return await courseModel.findByIdAndUpdate(courseId, payload).lean()
}

export const findAllCourseAndPopulate = async (excludeFields: string) => {
	return await courseModel
		.find({})
		.populate('thumbnail')
		.populate('dataCourse', excludeFields)
		.lean()
}

export const findCourseByIdAndReview = async (courseId: string) => {
	return await courseModel.findById(courseId).populate('reviews', '+rating')
}

export const findAllCourse = async () => {
	return await courseModel.find().lean()
}
