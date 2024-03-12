import mongoose, { Document, Model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Picture'
const COLLECTION_NAME = 'Pictures'

export interface IPicture extends Document {
	publicId: string
	url: string
}

const pictureSchema: Schema<IPicture> = new mongoose.Schema<IPicture>(
	{
		publicId: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const pictureModel: Model<IPicture> = mongoose.model<IPicture>(
	DOCUMENT_NAME,
	pictureSchema,
)

export default pictureModel
