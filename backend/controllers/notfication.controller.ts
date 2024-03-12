import { NextFunction, Request, Response } from 'express'
import notificationService from '../services/notification.service'
import { OkResponse } from '../utils/success.response'

class NotificationController {
	async getNotifications(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await notificationService.getNotifications(),
		}).send(res)
	}

	async updateNotifcation(req: Request, res: Response, next: NextFunction) {
		console.log('run here')
		return new OkResponse({
			metaData: await notificationService.updateNotification(req.params.id),
		}).send(res)
	}
}

export default new NotificationController()
