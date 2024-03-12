import { ObjectId } from 'mongoose'
import { IRegistrationBody } from '../../utils/types'
import userModel from '../user.model'

export const findUserByEmail = async (
	email: string,
	options?: { password: boolean },
) => {
	if (options?.password) {
		return await userModel.findOne({ email }).select('+password')
	}
	return await userModel.findOne({ email })
}

export const createNewUser = async (payload: IRegistrationBody) => {
	return await userModel.create(payload)
}

export const verifyUser = async (userId: string) => {
	return await userModel.findByIdAndUpdate(userId, { isVerified: true }).lean()
}

export const findUserByIdAndDelete = async (userId: string) => {
	return await userModel.findByIdAndDelete(userId).lean()
}

export const findUserById = async (
	userId: string,
	options?: { password: boolean },
) => {
	if (options?.password) {
		return await userModel.findById(userId).select('password')
	}
	return await userModel.findById(userId)
}

export const findUserByIdAndPopular = async (userId: string) => {
	return await userModel.findById(userId).populate('avatar').lean()
}

export const findUserByIdAndUpdateAvatar = async (
	userId: string,
	payload: { avatar: string },
) => {
	return await userModel.findByIdAndUpdate(userId, payload).lean()
}

export const findAllUsers = async () => {
	return await userModel.find().lean()
}
