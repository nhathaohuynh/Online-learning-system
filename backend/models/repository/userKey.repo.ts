import userKey from '../userKey.model'
import { IUserKey } from './../userKey.model'

export const findByUserIdAndUpdateUserKey = async (
	userId: string,
	payload: Pick<
		IUserKey,
		'privateKey' | 'publicKey' | 'refreshToken' | 'refreshTokenUsage'
	>,
) => {
	return userKey
		.findOneAndUpdate({ user: userId }, payload, {
			new: true,
			upsert: true,
		})
		.lean()
}

export const findKeyByUserId = async (userId: string) => {
	return await userKey.findOne({ user: userId }).lean()
}

export const findUserKeyAndDelete = async (userId: string) => {
	return await userKey.findOneAndDelete({ user: userId }).lean()
}
