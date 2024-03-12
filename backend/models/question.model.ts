import mongoose, { Document, Model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Question'
const COLLECTION_NAME = 'Question'

export interface IQuestion extends Document {
	user: Schema.Types.ObjectId
	content: string
	dataCourseId: Schema.Types.ObjectId
	contentReplies: [Schema.Types.ObjectId]
}

const questionSchema: Schema<IQuestion> = new Schema<IQuestion>(
	{
		user: {
			type: Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		dataCourseId: {
			type: Schema.ObjectId,
			ref: 'DataCourse',
		},
		content: {
			type: String,
			required: true,
		},
		contentReplies: [
			{
				type: Schema.ObjectId,
				ref: 'Question',
			},
		],
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const questionModel: Model<IQuestion> = mongoose.model<IQuestion>(
	DOCUMENT_NAME,
	questionSchema,
)

export default questionModel
