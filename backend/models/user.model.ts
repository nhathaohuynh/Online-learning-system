import bcryptjs from 'bcryptjs'
import mongoose, { Document, Model, Schema } from 'mongoose'
import { env } from '../config/env.config'
import { IPicture } from './picture.model'
const emailRexPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/

export interface IUser extends Document {
	name: string
	email: string
	password: string
	avatar: IPicture
	isVerified: boolean
	role: string
	isBlocked: boolean
	courses: Array<{ courseId: string }>
	comparePassword: (password: string) => Promise<boolean>
}

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'
const SALT = 10

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, 'Please enter your name'],
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			validate: {
				validator: function (value: string) {
					return emailRexPattern.test(value)
				},
				message: 'Please enter valid email',
			},
			unique: true,
			index: true,
		},

		password: {
			type: String,
			minlength: [6, 'Password must be at least 6 characters long'],
			maxlength: [20, 'Password must be at maximum 20 characters long'],
			select: false,
		},

		avatar: {
			type: Schema.ObjectId,
			ref: 'Picture',
		},

		role: {
			type: String,
			default: env.USER_ROLE as string,
		},

		isVerified: {
			type: Boolean,
			default: false,
		},

		isBlocked: {
			type: Boolean,
			default: false,
		},

		courses: [
			{
				courseId: String,
			},
		],
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

// hash password before saving
userSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	this.password = await bcryptjs.hash(this.password, SALT)
	next()
})

userSchema.methods.comparePassword = async function (
	enteredPassword: string,
): Promise<Boolean> {
	console.log(this.password)
	return await bcryptjs.compare(enteredPassword, this.password)
}
const userModel: Model<IUser> = mongoose.model<IUser>(DOCUMENT_NAME, userSchema)

export default userModel
