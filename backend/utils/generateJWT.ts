import jwt from 'jsonwebtoken'
import { env } from '../config/env.config'
import { IActivationToken, IRegistrationBody } from './types'

export const generateActivationToken = (
	data: {
		user: Pick<IRegistrationBody, 'email' | 'name'>
		activationCode: number
	},
	secret: string,
	expiresTime: string,
): string => {
	const token = jwt.sign(data, secret, { expiresIn: expiresTime })
	return token
}

export const verifyActivationToken = (token: string, secret: string) => {
	return jwt.verify(token, secret) as {
		user: IRegistrationBody
		activationCode: string
	}
}

export const generatePairToken = (
	payload: { userId: string },
	publicKey: string,
	privateKey: string,
) => {
	const accessToken = jwt.sign(payload, publicKey, {
		expiresIn: '30m',
	})

	const refreshToken = jwt.sign(payload, privateKey, {
		expiresIn: '7d',
	})

	return { accessToken, refreshToken }
}
