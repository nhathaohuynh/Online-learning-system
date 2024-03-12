import {
	findNotifcationByIdAndUpdate,
	findNotificationById,
	findNotifications,
} from '../models/repository/notification.repo'
import { BadRequest } from '../utils/error.response'

class NotificationService {
	async getNotifications() {
		const notifications = await findNotifications()

		return {
			notifications,
		}
	}

	async updateNotification(notificationId: string) {
		const notification = await findNotificationById(notificationId)

		if (!notification)
			throw new BadRequest('Occuring with update notification.')

		await findNotifcationByIdAndUpdate(notificationId)

		return {
			notification: notificationId,
		}
	}
}

export default new NotificationService()
