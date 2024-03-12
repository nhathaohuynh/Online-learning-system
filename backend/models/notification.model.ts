import mongoose, { Document, Model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Notification'
const COLLECTION_NAME = 'Notifications'

export interface INotification extends Document {
	title: string
	message: string
	status: string
	userId: string
}

const notificationShema = new Schema<INotification>(
	{
		title: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['READ', 'UNREAD'],
			default: 'UNREAD',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const notificationModel: Model<INotification> = mongoose.model<INotification>(
	DOCUMENT_NAME,
	notificationShema,
)

export default notificationModel
