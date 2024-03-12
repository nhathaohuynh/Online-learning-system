import mongoose, { Document, Model, Schema } from 'mongoose'
import { ICourse } from './course.model'
import { IDataCourse } from './dataCourse.model'
import { IPicture } from './picture.model'
import { IReview } from './review.model'

const DOCUMENT_NAME = 'ErasedCoruse'
const COLLECTION_NAME = 'ErasedCoruses'

export interface IErasedCourse extends Document {
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
	reviews: [IReview]
	dataCourse: [IDataCourse]
	ratings?: number
	purchased?: number
}

const erasedCourseSchema: Schema<IErasedCourse> =
	new mongoose.Schema<IErasedCourse>(
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
				publicId: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
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
			],

			dataCourse: [
				{
					title: {
						type: String,
						required: true,
					},

					courseId: {
						type: Schema.ObjectId,
						required: false,
						index: true,
					},

					description: {
						type: String,
						required: true,
					},

					videoUrl: {
						type: String,
						required: true,
					},

					videoSection: {
						type: String,
						required: true,
					},

					videoLength: {
						type: Number,
						required: true,
					},

					videoPlayer: String,

					links: [
						{
							title: {
								type: String,
								required: true,
							},
							url: {
								type: String,
								required: true,
							},
						},
					],

					suggestion: String,

					questions: [
						{
							type: Schema.ObjectId,
							ref: 'Question',
						},
					],
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
		},
		{
			timestamps: true,
			collection: COLLECTION_NAME,
		},
	)

const erasedCourseModel: Model<IErasedCourse> = mongoose.model<IErasedCourse>(
	DOCUMENT_NAME,
	erasedCourseSchema,
)

export default erasedCourseModel
