import { NextFunction } from 'express'
import sendMail from '../mails/sendMail'
import { findCourseById } from '../models/repository/course.repo'
import { insertNotification } from '../models/repository/notification.repo'
import { findAllOrders, insertOrder } from '../models/repository/order.repo'
import { findUserById } from '../models/repository/user.repo'
import { BadRequest } from '../utils/error.response'
import { IBodyOrder } from '../utils/types'

class OrderService {
	async handleCreateOrder(
		userId: string,
		body: IBodyOrder,
		next: NextFunction,
	) {
		const { courseId } = body
		const userPromise = findUserById(userId)
		const coursePromise = findCourseById(courseId)
		const [user, course] = await Promise.all([userPromise, coursePromise])

		if (!user) throw new BadRequest('Something went wrong. Please try again')
		if (!course) throw new BadRequest('Course does not exist.')

		const isCourseBelongsToUser = user.courses.some(
			(course) => course.courseId === courseId,
		)

		if (isCourseBelongsToUser)
			throw new BadRequest('you have already purchased this course')

		const payload = {
			...body,
			userId,
		}

		const order = await insertOrder(payload)

		if (!order) throw new BadRequest('Create new order is failed.')

		course.purchased ? (course.purchased += 1) : course.purchased

		user.courses.push({ courseId: courseId })

		const updateUserPromise = user.save()

		const payloadNotifcation = {
			title: 'New Order',
			userId: userId,
			message: `You have new order from ${course.name}`,
		}
		const newNotificationPromise = insertNotification(payloadNotifcation)

		const mailData = {
			order: {
				_id: course._id,
				name: course.name,
				price: course.price,
				date: new Date().toLocaleString('en-US', {
					timeZone: 'Asia/Ho_Chi_Minh',
				}),
			},
		}

		try {
			await Promise.all([
				updateUserPromise,
				course.save(),
				newNotificationPromise,
				sendMail({
					email: user.email,
					subject: 'Order Confirmation',
					template: 'orderConfirmation.ejs',
					data: mailData,
				}),
			])
		} catch (err: any) {
			next(new BadRequest(err.message))
		}

		return {
			order: order._id,
		}
	}

	async getAllOrders() {
		const orders = await findAllOrders()
		return {
			orders,
		}
	}
}

export default new OrderService()
