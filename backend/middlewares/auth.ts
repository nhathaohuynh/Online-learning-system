import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { findKeyByUserId } from '../models/repository/userKey.repo'
import { BadRequest, Unauthorized } from '../utils/error.response'
import redis from '../utils/redis'
import catchAsyncHandler from './catchAsyncHandler'

export const isAuthenticated = catchAsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const accessToken = req.cookies?.accessToken as string
		const userId = req?.headers['x-client-id'] as string
		if (!accessToken)
			return next(new Unauthorized('Please login to access recourse.'))
		if (!userId)
			return next(
				new Unauthorized('Please provide client id to access recourse.'),
			)
		const user = await redis.get(userId)

		const userKeys: any = await findKeyByUserId(userId)
		if (!userKeys) return next(new BadRequest('Occuring error with tokens'))

		const decoded = jwt.verify(accessToken, userKeys?.publicKey) as {
			userId: string
		}

		if (decoded.userId !== userId)
			throw new BadRequest('Can not authorized user.')

		if (!decoded)
			return next(new BadRequest('Occuring error with access token.'))

		if (!user) return next(new Unauthorized('User not found'))

		req.user = JSON.parse(user as any)
		next()
	},
)

// validate user role

export const authorizedRoles = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!roles.includes(req.user?.role || '')) {
			return next(new Unauthorized('Not allowed to access resource!'))
		}
		next()
	}
}
