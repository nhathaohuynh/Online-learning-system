import courseModel from '../models/course.model'
import userModel from '../models/user.model'
import { generateLast12MonthsData } from '../utils/analytics.generate'

class analyticsService {
	async handleGetUserAnalytics() {
		const users = await generateLast12MonthsData(userModel)
		return {
			users,
		}
	}

	async handleGetCourseAnalytics() {
		const courses = await generateLast12MonthsData(courseModel)
		return {
			courses,
		}
	}

	async handleGetOrderAnalytics() {
		const orders = await generateLast12MonthsData(userModel)
		return {
			orders,
		}
	}
}

export default new analyticsService()
