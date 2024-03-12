import express from 'express'
import { env } from '../config/env.config'
import {
	default as UserController,
	default as userController,
} from '../controllers/user.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import asyncHandler from '../middlewares/catchAsyncHandler'
import validate, { validateParams } from '../validations'
import {
	activationSchema,
	loginSchema,
	registerSchema,
	socialAuthSchema,
	updateAvatarSchema,
	updatePasswordSchema,
	updateUserInfoSchema,
} from '../validations/user.schema'

const route = express.Router()

route.post(
	'/register',
	validate(registerSchema),
	asyncHandler(UserController.handleRegistrationUser),
)

route.post(
	'/activate-user',
	validate(activationSchema),
	asyncHandler(UserController.handleActivateUser),
)

route.post(
	'/login',
	validate(loginSchema),
	asyncHandler(UserController.handleLoginUser),
)

route.delete(
	'/logout',
	isAuthenticated,
	authorizedRoles(env.USER_ROLE as string, env.ADMIN_ROLE as string),
	asyncHandler(UserController.handleLogoutUser),
)

route.get(
	'/:id',
	isAuthenticated,
	authorizedRoles(env.USER_ROLE as string, env.ADMIN_ROLE as string),
	asyncHandler(UserController.getUserInfomation),
)

route.get(
	'/',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	asyncHandler(UserController.handleGetUsers),
)

route.get('/refresh', asyncHandler(UserController.handleRefreshToken))

route.get(
	'/social',
	validate(socialAuthSchema),
	asyncHandler(UserController.handleSocialAuth),
)

route.put(
	'/',
	isAuthenticated,
	validate(updateUserInfoSchema),
	asyncHandler(userController.handleUpdateUserInfo),
)

route.put(
	'/change-password',
	isAuthenticated,
	validate(updatePasswordSchema),
	asyncHandler(userController.handleUpdatePassword),
)

route.put(
	'/update-avatar',
	isAuthenticated,
	validate(updateAvatarSchema),
	asyncHandler(UserController.handleUpdateProfilePictutre),
)

route.delete(
	'/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validateParams(),
	asyncHandler(UserController.handleBlockUser),
)

module.exports = route
