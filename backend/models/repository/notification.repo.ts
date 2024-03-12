import { IBodyNotification } from '../../utils/types'
import notificationModel from '../notification.model'

export const insertNotification = async (payload: IBodyNotification) => {
	return await notificationModel.create(payload)
}

export const findNotifications = async () => {
	return await notificationModel.find().sort({ createdAt: -1 }).lean()
}

export const findNotifcationByIdAndUpdate = async (
	notificationId: string,
	status: string = 'read',
) => {
	return await notificationModel.findByIdAndUpdate(notificationId, { status })
}

export const findNotificationById = async (notificationId: string) => {
	return await notificationModel.findById(notificationId).lean()
}
