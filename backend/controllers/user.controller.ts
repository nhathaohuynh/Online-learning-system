import { NextFunction, Request, Response } from 'express'
import userService from '../services/user.service'
import { BadRequest, Unauthorized } from '../utils/error.response'
import { CreatedResponse, OkResponse } from '../utils/success.response'

class UserController {
	async handleRegistrationUser(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		return new CreatedResponse({
			message: 'Please check your email to activate account!',
			metaData: {
				data: await userService.handleRegistrationUser(req.body, next),
			},
		}).send(res)
	}

	async handleActivateUser(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.handlerActivateUser(req.body),
		}).send(res)
	}

	async handleLoginUser(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.handleLoginUser(req.body, res),
		}).send(res)
	}

	async handleLogoutUser(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.handleLogoutUser(req.user?._id, res),
		}).send(res)
	}

	async handleRefreshToken(req: Request, res: Response, next: NextFunction) {
		const userId = req.headers['x-client-id'] as string
		if (!userId)
			return next(
				new Unauthorized('Please provide client id to access resource.'),
			)

		const refreshToken = req.cookies?.refreshToken
		if (!refreshToken)
			return next(new Unauthorized('Please provide refresh token.'))

		const data = await userService.handleRefreshToken(
			userId,
			refreshToken,
			res,
			next,
		)

		if (!data)
			return next(new BadRequest('Something went wrong. Please try again'))

		return new OkResponse({
			metaData: data,
		}).send(res)
	}

	async getUserInfomation(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.getUserInformation(req.user?._id),
		}).send(res)
	}

	async handleSocialAuth(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.handleSocialAuth(req.body),
		}).send(res)
	}

	async handleUpdateUserInfo(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.handleUpdateUserInfo(req.user?._id, req.body),
		}).send(res)
	}

	async handleUpdatePassword(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.handleUpdatePassword(req.user?._id, req.body),
		}).send(res)
	}

	async handleUpdateProfilePictutre(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		return new OkResponse({
			metaData: await userService.handleUpdateProfilePictutre(
				req.user?._id,
				req.body,
				next,
			),
		}).send(res)
	}

	async handleGetUsers(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.handleGetUsers(),
		}).send(res)
	}

	async handleBlockUser(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.handleBlockUser(req.params.id),
		}).send(res)
	}

	async handleUpdateRole(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await userService.handleUpdateRole(req.body),
		}).send(res)
	}
}

export default new UserController()
