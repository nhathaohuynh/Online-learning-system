import { ObjectId } from 'mongoose'
import { IBodyUpdateDataCourse, ICreateDataCourse } from '../../utils/types'
import dataCourseModel from '../dataCourse.model'

export const insertManyDataCourse = async (
	payload: ICreateDataCourse[],
): Promise<any> => {
	return await dataCourseModel.insertMany(payload)
}

export const findDataCourseById = async (dataCourseId: string) => {
	return await dataCourseModel.findById(dataCourseId)
}

export const findDataCourseByIdAndUpdate = async (
	dataCourseId: string,
	payload: IBodyUpdateDataCourse,
) => {
	return await dataCourseModel.findByIdAndUpdate(dataCourseId, payload).lean()
}
