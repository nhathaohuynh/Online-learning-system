import { NextFunction, Request, Response } from 'express'
import { env } from '../config/env.config'
import sendMail from '../mails/sendMail'
import {
	createNewUser,
	findAllUsers,
	findUserByEmail,
	findUserById,
	findUserByIdAndDelete,
	findUserByIdAndPopular,
	findUserByIdAndUpdateAvatar,
	verifyUser,
} from '../models/repository/user.repo'
import { BadRequest } from '../utils/error.response'
import {
	generateActivationToken,
	generatePairToken,
	verifyActivationToken,
} from '../utils/generateJWT'
import {
	IActivationToken,
	IBodyUpdateRole,
	ILoginBody,
	IRegistrationBody,
	ITokenOptions,
	IUpdateUserInfo,
	IactivationRequest,
} from '../utils/types'

import _ from 'lodash'

import cloudinary from 'cloudinary'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { IPicture } from '../models/picture.model'
import { createNewPicture } from '../models/repository/picture.repo'
import {
	findByUserIdAndUpdateUserKey,
	findKeyByUserId,
	findUserKeyAndDelete,
} from '../models/repository/userKey.repo'
import { IUser } from '../models/user.model'
import { unselectFields } from '../utils/optionsFields'
import redis from '../utils/redis'

class UserService {
	async handleRegistrationUser(body: IRegistrationBody, next: NextFunction) {
		const { email, name, password } = body
		const isEmailExist = await findUserByEmail(email)
		if (isEmailExist) throw new BadRequest('Email already exist')

		const user: IRegistrationBody = {
			name,
			email,
			password,
		}
		const activationToken = createActivationToken({ email, name })
		const activationCode = activationToken.activationCode
		const data = { user: { name: user.name }, activationCode }
		const newUser = await createNewUser(user)

		if (!newUser)
			throw new BadRequest('Something went wrong. Please try again!')

		setTimeout(async () => {
			const user = await findUserByEmail(email)
			if (!user?.isVerified) {
				await findUserByIdAndDelete(user?._id)
			}
		}, 5 * 60 * 1000)

		try {
			await sendMail({
				email: user.email,
				subject: 'Activate your account OLS',
				template: 'activationEmail.ejs',
				data,
			})
			return {
				activationToken: activationToken.token,
			}
		} catch (err: any) {
			return next(
				new BadRequest('Sendding email occured error. Please try again'),
			)
		}
	}

	async handlerActivateUser(body: IactivationRequest) {
		const { activationCode, activationToken } = body
		const tokenVerified: {
			user: Pick<IRegistrationBody, 'email' | 'name'>
			activationCode: string
		} = verifyActivationToken(activationToken, env.ACTIVATION_SECRET as string)

		if (activationCode !== tokenVerified.activationCode)
			throw new BadRequest('Invalid activation code')

		const { email } = tokenVerified.user
		const existUser = await findUserByEmail(email)

		if (!existUser)
			throw new BadRequest('Something went wrong. Please try again!')

		await verifyUser(existUser._id)
		return {}
	}

	async handleLoginUser(body: ILoginBody, res: Response) {
		const { email, password } = body
		const user = await findUserByEmail(email, { password: true })
		if (!user) throw new BadRequest('Invalid email or password')

		if (user.isBlocked)
			throw new BadRequest('User is blocked. Please contact admin.')

		if (!user.isVerified) throw new BadRequest('Please verify your account.')

		const isPasswordMatch = await user.comparePassword(password)
		if (!isPasswordMatch) throw new BadRequest('Invalid email or password')

		const publicKey = crypto.randomBytes(64).toString('hex')
		const privateKey = crypto.randomBytes(64).toString('hex')
		const payloadToken = {
			userId: user._id,
		}
		const tokens = generatePairToken(payloadToken, publicKey, privateKey)
		const payload = {
			publicKey,
			privateKey,
			refreshToken: tokens.refreshToken,
			refreshTokenUsage: [] as string[],
		}
		const userKey = await findByUserIdAndUpdateUserKey(user._id, payload)
		if (!userKey) throw new BadRequest('Occured error with token .')

		sendToken(user, tokens, res)

		return {
			user: unselectFields(user, ['password', 'createdAt', 'updatedAt']),
			accessToken: tokens.accessToken,
		}
	}

	async handleLogoutUser(userId: string, res: Response) {
		res.cookie('accessToken', '', { maxAge: 1 })
		res.cookie('refreshToken', '', { maxAge: 1 })

		redis.del(userId)

		await findUserKeyAndDelete(userId)

		return
	}

	async handleRefreshToken(
		userId: string,
		refreshToken: string,
		res: Response,
		next: NextFunction,
	) {
		const userKeys: any = await findKeyByUserId(userId)
		if (!userKeys) return next(new BadRequest('Occuring error with tokens'))
		try {
			const decoded = jwt.verify(refreshToken, userKeys?.privateKey) as {
				userId: string
			}

			if (decoded.userId !== userId)
				throw new BadRequest('Can not authorized user.')

			const publicKey = crypto.randomBytes(64).toString('hex')
			const privateKey = crypto.randomBytes(64).toString('hex')
			const payloadToken = {
				userId,
			}

			const tokens = generatePairToken(payloadToken, publicKey, privateKey)

			const payload = {
				publicKey,
				privateKey,
				refreshToken: tokens.refreshToken,
				refreshTokenUsage: [...userKeys?.refreshTokenUsage, refreshToken] as [
					string,
				],
			}
			const userKey = await findByUserIdAndUpdateUserKey(userId, payload)
			if (!userKey) throw new BadRequest('Occured error with token .')

			sendCookie(res, tokens)

			return {
				accessToken: tokens.accessToken,
			}
		} catch (err: any) {
			return next(new BadRequest(err.message))
		}
	}

	async getUserInformation(userId: string) {
		const userInfo = await redis.get(userId)

		if (userInfo) {
			return {
				userInfo: JSON.parse(userInfo),
			}
		}

		const user = await findUserByIdAndPopular(userId)

		console.log(user)

		console.log(user)
		return {
			userInfo: await findUserByIdAndPopular(userId),
		}
	}

	async handleSocialAuth(body: IRegistrationBody) {
		const { email } = body

		const user = await findUserByEmail(email)

		if (user)
			return {
				userInfo: user,
			}

		const newUser = await createNewUser(body)

		return {
			userInfo: newUser,
		}
	}

	async handleUpdateUserInfo(userId: string, body: IUpdateUserInfo) {
		const { name, email, courses } = body
		const user = await findUserById(userId)

		if (email && user) {
			const isExistingEmail = await findUserByEmail(email)
			if (isExistingEmail) throw new BadRequest('Email already existed.')

			user.email = email
		}

		if (name && user) {
			user.name = name
		}

		if (courses && user) {
			user.courses = courses
		}

		await user?.save()

		redis.set(userId, JSON.stringify(user))

		return {
			userInfo: user,
		}
	}

	async handleUpdatePassword(
		userId: string,
		body: { oldPassword: string; newPassword: string },
	) {
		const { oldPassword, newPassword } = body
		const user = await findUserById(userId, { password: true })

		if (!user) throw new BadRequest('User doest not exist')

		if (user?.password === 'undefined') throw new BadRequest('Invalid user.')

		const isPasswordMatch = await user.comparePassword(oldPassword)
		if (!isPasswordMatch) throw new BadRequest('Invalid old password.')

		user.password = newPassword

		await user.save()

		return {
			userId,
		}
	}

	async handleUpdateProfilePictutre(
		userId: string,
		body: IUpdateUserInfo,
		next: NextFunction,
	) {
		const { avatar } = body
		console.log(avatar)
		const user = await findUserByIdAndPopular(userId)

		if (!user || !avatar) throw new BadRequest('Occuring eror with user.')

		try {
			if (user?.avatar?.publicId) {
				await cloudinary.v2.uploader.destroy(user?.avatar?.publicId)
			}

			const myCloud = await cloudinary.v2.uploader.upload(avatar, {
				folder: 'OLS',
				width: 150,
			})

			const payload = {
				publicId: myCloud.public_id,
				url: myCloud.secure_url,
			} as IPicture

			const picture = await createNewPicture(payload)

			await findUserByIdAndUpdateAvatar(userId, { avatar: picture._id })

			await redis.set(userId, JSON.stringify({ ...user, avatar: picture._id }))
		} catch (err: any) {
			return next(new BadRequest(err.message))
		}

		return {
			userId,
		}
	}

	async handleGetUsers() {
		const users = await findAllUsers()

		return {
			users,
		}
	}

	async handleBlockUser(userBlockId: string) {
		const user = await findUserById(userBlockId)
		if (!user) throw new BadRequest('Occuring with blocking user.')

		user.isBlocked = true

		await user.save()

		return {
			userId: userBlockId,
		}
	}

	async handleUpdateRole(body: IBodyUpdateRole) {
		const { userId, role } = body
		const user = await findUserById(userId)

		if (!user) throw new BadRequest('Occuring with updating role.')

		user.role = role

		await user.save()

		return {
			userId,
		}
	}
}

const createActivationToken = (
	user: Pick<IRegistrationBody, 'email' | 'name'>,
): IActivationToken => {
	const expiresTime: string = '5m'
	const activationCode = Math.floor(1000 + Math.random() * 9000)
	const token = generateActivationToken(
		{ user, activationCode },
		env.ACTIVATION_SECRET as string,
		expiresTime,
	)

	return {
		token,
		activationCode,
	}
}

const sendCookie = (
	res: Response,
	tokens: { accessToken: string; refreshToken: string },
) => {
	const accessTokenOptions: ITokenOptions = {
		expries: new Date(
			Date.now() + parseInt(env.EXPIRES_ACCESS_TOKEN as string) * 60 * 1000,
		),
		maxAge: parseInt(env.EXPIRES_ACCESS_TOKEN as string) * 60 * 1000,
		httpOnly: true,
		sameSite: 'lax',
	}

	const refreshTokenOptions: ITokenOptions = {
		expries: new Date(
			Date.now() +
				parseInt(env.EXPIRES_REFRESH_TOKEN as string) * 24 * 60 * 60 * 1000,
		),
		maxAge: parseInt(env.EXPIRES_REFRESH_TOKEN as string) * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: 'lax',
	}

	// set to introduction
	if (process.env.NODE_ENV === 'production') {
		accessTokenOptions.secure = true
	}

	res.cookie('accessToken', tokens.accessToken, accessTokenOptions)
	res.cookie('refreshToken', tokens.refreshToken, refreshTokenOptions)
}

const sendToken = (
	user: IUser,
	tokens: { accessToken: string; refreshToken: string },
	res: Response,
) => {
	// upload session to redis
	redis.set(
		user._id,
		JSON.stringify(
			unselectFields(user, ['password', 'createdAt', 'updatedAt']),
		) as any,
	)

	sendCookie(res, tokens)

	return
}

export default new UserService()
