import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface IUserKey extends Document {
	user: Types.ObjectId
	privateKey: string
	publicKey: string
	refreshToken: string
	refreshTokenUsage: string[]
}

const DOCUMENT_NAME = 'UserKey'
const COLLECTION_NAME = 'UserKeys'

const userKeySchema: Schema<IUserKey> = new mongoose.Schema<IUserKey>(
	{
		user: {
			type: Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		privateKey: String,
		publicKey: String,
		refreshToken: String,
		refreshTokenUsage: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const userKey: Model<IUserKey> = mongoose.model<IUserKey>(
	DOCUMENT_NAME,
	userKeySchema,
)

export default userKey
