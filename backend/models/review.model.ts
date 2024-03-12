import mongoose, { Document, Model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Review'
const COLLECTION_NAME = 'Review'

export interface IReview extends Document {
	user: Schema.Types.ObjectId
	comment: string
	rating: number
	commentRepies: string
}

export const reviewSchema: Schema<IReview> = new Schema<IReview>(
	{
		user: {
			type: Schema.ObjectId,
			ref: 'User',
		},
		rating: {
			type: Number,
			default: 0,
		},
		comment: String,
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const reviewModel: Model<IReview> = mongoose.model<IReview>(
	DOCUMENT_NAME,
	reviewSchema,
)

export default reviewModel
