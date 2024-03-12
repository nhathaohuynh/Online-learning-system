import {
	findDataCourseById,
	findDataCourseByIdAndUpdate,
} from '../models/repository/dataCourse.repo'
import { BadRequest } from '../utils/error.response'
import { IBodyUpdateDataCourse } from '../utils/types'

class DataCourseService {
	async handleUpdateDataCourse(
		dataCourseId: string,
		bodyUpdate: IBodyUpdateDataCourse,
	) {
		const rawDataCourse = await findDataCourseById(dataCourseId)

		if (!rawDataCourse) throw new BadRequest('Data course doest not exist.')

		const dataUpdated = await findDataCourseByIdAndUpdate(
			dataCourseId,
			bodyUpdate,
		)

		if (!dataUpdated)
			throw new BadRequest('Occuring wiith updating data course.')

		return {
			_id: dataCourseId,
		}
	}
}

export default new DataCourseService()
