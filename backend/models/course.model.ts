import mongoose, { Document, Model, Query, Schema } from 'mongoose'
import { IPicture } from './picture.model'
import { IReview } from './review.model'

const DOCUMENT_NAME = 'Course'
const COLLECTION_NAME = 'Courses'

export interface ICourse extends Document {
	name: string
	description: string
	price: number
	estimatedPrice?: number
	thumbnail?: IPicture
	tags: string
	level: string
	demoUrl: string
	benefits: { title: string }[]
	prerequisites: { title: string }[]
	topTenReviews?: Object[]
	reviews: IReview[]
	dataCourse: [Schema.Types.ObjectId]
	ratings?: number
	purchased?: number
	deleteAt: Date
}

const courseSchema: Schema<ICourse> = new mongoose.Schema<ICourse>(
	{
		name: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		estimatedPrice: Number,

		thumbnail: {
			type: Schema.ObjectId,
			ref: 'Picture',
		},
		tags: {
			type: String,
			required: true,
		},
		level: {
			type: String,
			required: true,
		},

		demoUrl: {
			type: String,
			required: true,
		},

		benefits: [
			{
				title: {
					type: String,
					required: true,
				},
			},
		],

		prerequisites: [
			{
				title: {
					type: String,
					required: true,
				},
			},
		],

		topTenReviews: [Object],

		reviews: [
			{
				type: Schema.ObjectId,
				ref: 'Review',
			},
		],

		dataCourse: [
			{
				type: Schema.ObjectId,
				ref: 'DataCourse',
			},
		],

		ratings: {
			type: Number,
			default: 0,
		},

		purchased: {
			type: Number,
			default: 0,
		},
		deleteAt: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

// want to filter out the deleted course
courseSchema.pre<Query<any, ICourse>>(/^find/, function (next) {
	this.find({ deleteAt: null })
	next()
})

const courseModel: Model<ICourse> = mongoose.model<ICourse>(
	DOCUMENT_NAME,
	courseSchema,
)

export default courseModel
