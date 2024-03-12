import cloudinary from 'cloudinary'
import { NextFunction, raw } from 'express'
import mongoose, { ObjectId } from 'mongoose'
import { IPicture } from '../models/picture.model'
import {
	createNewCourse,
	findAllCourse,
	findAllCourseAndPopulate,
	findCourseById,
	findCourseByIdAndPopulate,
	findCourseByIdAndUpdate,
} from '../models/repository/course.repo'
import { insertManyDataCourse } from '../models/repository/dataCourse.repo'
import {
	createNewPicture,
	findPictureByIdAndUpdate,
} from '../models/repository/picture.repo'
import { findUserById } from '../models/repository/user.repo'
import { BadRequest } from '../utils/error.response'
import redis from '../utils/redis'
import { IBodyUpdateCourse, ICreateCourse } from '../utils/types'

class CourseService {
	async handleCreateNewCourse(body: ICreateCourse, next: NextFunction) {
		const thumbnail = body?.thumbnail

		try {
			if (thumbnail) {
				const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
					folder: 'OLS',
				})

				const payload = {
					publicId: myCloud.public_id,
					url: myCloud.secure_url,
				} as IPicture

				const picture = await createNewPicture(payload)

				if (!picture) return next(new BadRequest('Upload thumbnail is failed.'))

				body.thumbnail = picture._id
			}
		} catch (err: any) {
			return next(new BadRequest(err.message))
		}

		const courseId = new mongoose.Types.ObjectId()

		const payloadDataCourse = body.dataCourse.map((el) => {
			return {
				...el,
				courseId,
			}
		})

		const dataInserted = await insertManyDataCourse(payloadDataCourse)

		if (!dataInserted)
			throw new BadRequest('create resource data course is failed')

		const payload = {
			_id: courseId,
			...body,
			dataCourse: dataInserted?.map((el: any) => el._id),
		}

		const course = await createNewCourse(payload)

		return {
			courseInfo: course,
		}
	}

	async handleEditCourse(
		courseId: string,
		bodyUpdate: IBodyUpdateCourse,
		next: NextFunction,
	) {
		const rawCourse = await findCourseById(courseId)

		if (!rawCourse) throw new BadRequest('Course doest not exist.')

		try {
			if (bodyUpdate?.thumbnail) {
				if (rawCourse.thumbnail?.publicId) {
					await cloudinary.v2.uploader.destroy(rawCourse.thumbnail?.publicId)
				}

				const myCloud = await cloudinary.v2.uploader.upload(
					bodyUpdate.thumbnail,
					{
						folder: 'OLS',
					},
				)
				const payload = {
					publicId: myCloud.public_id,
					url: myCloud.secure_url,
				} as IPicture

				const updatePicturePromise = findPictureByIdAndUpdate(
					rawCourse.thumbnail?._id,
					payload,
				) as Promise<Awaited<ReturnType<typeof findPictureByIdAndUpdate>>>

				// delete bodyUpdate.thumbnail

				const updateCoursePromise = findCourseByIdAndUpdate(
					courseId,
					bodyUpdate,
				) as Promise<Awaited<ReturnType<typeof findCourseByIdAndUpdate>>>

				await Promise.all([updatePicturePromise, updateCoursePromise])

				return {
					_id: courseId,
				}
			}
		} catch (err: any) {
			next(new BadRequest(err?.message))
		}
	}

	async getSingleCourse(courseId: string) {
		const excludeFields = '-suggestion -links -videoUrl -comments'

		const isCacheExist = await redis.get(courseId)

		if (isCacheExist) {
			return {
				courseInfo: JSON.parse(isCacheExist),
			}
		} else {
			const rawCourse = await findCourseByIdAndPopulate(courseId, excludeFields)
			redis.set(courseId, JSON.stringify(rawCourse))

			return {
				courseInfo: rawCourse,
			}
		}
	}

	async getAllCourse() {
		const excludeFields = '-suggestion -links -videoUrl -comments'

		const isCacheExist = await redis.get('all-course')

		if (isCacheExist) {
			return {
				coursesInfo: JSON.parse(isCacheExist),
			}
		} else {
			const rawCourse = await findAllCourseAndPopulate(excludeFields)

			redis.set('all-course', JSON.stringify(rawCourse))

			return {
				coursesInfo: rawCourse,
			}
		}
	}

	async getCourseValidUser(userId: string, courseId: string) {
		const rawUser = await findUserById(userId)

		if (!rawUser) throw new BadRequest('User does not exist.')

		const isBelongToCourse = rawUser?.courses.some(
			(el) => el.courseId === courseId,
		)

		if (!isBelongToCourse)
			throw new BadRequest("You don't  belongs to this course.")

		const rawCourse = await findCourseByIdAndPopulate(courseId)

		if (!rawCourse) throw new BadRequest('Course does not exist.')

		return {
			courseInfo: rawCourse,
		}
	}

	async getAllCourses() {
		const courses = await findAllCourse()
		return {
			courses,
		}
	}
}

export default new CourseService()
