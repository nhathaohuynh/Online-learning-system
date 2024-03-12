import { ObjectId, Types, mongo } from 'mongoose'
import { IReview } from '../models/review.model'

export interface TypeSuccessResponse {
	message?: string
	status?: number
	metaData: any
}

export interface TypeEnv {
	PORT?: string
	ORIGIN?: string
	MONGO_URL?: string
	CLOUD_NAME?: string
	CLOUD_API_KEY?: string
	CLOUD_SECRET_KEY?: string
	ACTIVATION_SECRET?: string
	SMTP_HOST?: string
	SMTP_POR?: string
	SMTP_SERVICE?: string
	SMTP_MAIL?: string
	SMTP_PASSWORD?: string
	MONGO_URL_LOCAL?: string
	EXPIRES_ACCESS_TOKEN?: string
	EXPIRES_REFRESH_TOKEN?: string
	NODE_ENV?: string
	REDIS_URL?: string
	ADMIN_ROLE?: string
	USER_ROLE?: string
}

export interface IRegistrationBody {
	name: string
	email: string
	password?: string
	avatar?: string
}

export interface IActivationToken {
	token: string
	activationCode: number
}

export interface ILoginBody {
	email: string
	password: string
}

export interface IEmailOptions {
	email: string
	subject: string
	template: string
	data: { [key: string]: any }
}

export interface IactivationRequest {
	activationToken: string
	activationCode: string
}

export interface ITokenOptions {
	expries: Date
	maxAge: number
	httpOnly: boolean
	sameSite: 'lax' | 'strict' | 'none' | undefined
	secure?: boolean
}

export interface IUpdateUserInfo {
	name?: string
	email?: string
	avatar?: string
	courses?: { courseId: string }[]
}

export interface IUpdateUserAvatar {
	avatar: {
		public_id: string
		url: string
	}
}

export interface ICreateCourse {
	name: string
	description: string
	price: number
	estimatedPrice?: number
	thumbnail?: string
	tags: string
	level: string
	demoUrl: string
	benefits: { title: string }[]
	prerequisites: { title: string }[]
	dataCourse: {
		title: string
		description: string
		videoUrl: string
		videoSection: string
		videoLength: number
		links: { title: string; url: string }[]
	}[]
}

export interface ICreateDataCourse {
	title: string
	description: string
	courseId: Types.ObjectId
	videoUrl: string
	videoSection: string
	videoLength: number
	links: { title: string; url: string }[]
}

export interface IBodyUpdateCourse {
	name?: string
	description?: string
	price?: number
	estimatedPrice?: number
	thumbnail?: string
	tags?: string
	level?: string
	demoUrl?: string
	benefits?: { title: string }[]
	prerequisites?: { title: string }[]
}

export interface IBodyUpdateDataCourse {
	title?: string
	description?: string
	courseId?: Types.ObjectId
	videoUrl?: string
	videoSection?: string
	videoLength?: number
	links?: { title: string; url: string }[]
}

export interface IBodyQuestion {
	content: string
	dataCourseId: string
}

export interface IBodyReview {
	rating: string
	courseId: string
	comment: string
}

export interface IBodyOrder {
	courseId: string
	paymentInfo?: Object
}

export interface IBodyNotification {
	userId: string
	title: string
	message: string
}
