import mongoose, { Document, Model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'DataCourse'
const COLLECTION_NAME = 'DataCourses'

export interface IDataCourse extends Document {
	title: string
	description: string
	videoUrl: string
	videoSection: string
	videoLength: number
	links: { title: string; url: string }[]
	videoPlayer: string
	suggestion: string
	questions: [Schema.Types.ObjectId]
	courseId: Schema.Types.ObjectId
}

export const dataCourseSchema: Schema<IDataCourse> =
	new mongoose.Schema<IDataCourse>(
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
		{
			timestamps: true,
			collection: COLLECTION_NAME,
		},
	)

const dataCourseModel: Model<IDataCourse> = mongoose.model<IDataCourse>(
	DOCUMENT_NAME,
	dataCourseSchema,
)

export default dataCourseModel
