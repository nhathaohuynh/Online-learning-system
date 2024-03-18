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
	updateRoleSchema,
	updateUserInfoSchema,
} from '../validations/user.schema'

/**
 * Express router for handling user-related endpoints.
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 *   basePath: /api/v1/OnlineLS/user
 */
const route = express.Router()

/**
 * Registers a new user.
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       200:
 *         description: User registration successful
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
route.post(
	'/register',
	validate(registerSchema),
	asyncHandler(UserController.handleRegistrationUser),
)

/**
 * Activates a user account.
 * @swagger
 * /activate-user:
 *   post:
 *     summary: Activate a user account
 *     tags: [User]
 *     requestBody:
 *       description: User activation details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivateUser'
 *     responses:
 *       200:
 *         description: User account activated successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
route.post(
	'/activate-user',
	validate(activationSchema),
	asyncHandler(UserController.handleActivateUser),
)

/**
 * Logs in a user.
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       description: User login details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
route.post(
	'/login',
	validate(loginSchema),
	asyncHandler(UserController.handleLoginUser),
)

/**
 * Logs out a user.
 * @swagger
 * /logout:
 *   delete:
 *     summary: Log out a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
route.delete(
	'/logout',
	isAuthenticated,
	authorizedRoles(env.USER_ROLE as string, env.ADMIN_ROLE as string),
	asyncHandler(UserController.handleLogoutUser),
)

/**
 * Retrieves user information by ID.
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get user information by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 *       500:
 *         description: Internal server error
 */
route.get(
	'/:id',
	isAuthenticated,
	authorizedRoles(env.USER_ROLE as string, env.ADMIN_ROLE as string),
	asyncHandler(UserController.getUserInfomation),
)

/**
 * Retrieves all users.
 * @swagger
 * /:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 *       500:
 *         description: Internal server error
 */
route.get(
	'/',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	asyncHandler(UserController.handleGetUsers),
)

/**
 * Refreshes the user's access token.
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh user access token
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       500:
 *         description: Internal server error
 */
route.get('/refresh', asyncHandler(UserController.handleRefreshToken))

/**
 * Authenticates a user using social media.
 * @swagger
 * /social:
 *   get:
 *     summary: Authenticate user using social media
 *     tags: [User]
 *     requestBody:
 *       description: Social media authentication details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SocialAuth'
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
route.get(
	'/social',
	validate(socialAuthSchema),
	asyncHandler(UserController.handleSocialAuth),
)

/**
 * Updates user information.
 * @swagger
 * /:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User information to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInfo'
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
route.put(
	'/',
	isAuthenticated,
	validate(updateUserInfoSchema),
	asyncHandler(userController.handleUpdateUserInfo),
)

/**
 * Changes user password.
 * @swagger
 * /change-password:
 *   put:
 *     summary: Change user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User password change details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePassword'
 *     responses:
 *       200:
 *         description: User password changed successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
route.put(
	'/change-password',
	isAuthenticated,
	validate(updatePasswordSchema),
	asyncHandler(userController.handleUpdatePassword),
)

/**
 * Updates user avatar.
 * @swagger
 * /update-avatar:
 *   put:
 *     summary: Update user avatar
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User avatar update details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAvatar'
 *     responses:
 *       200:
 *         description: User avatar updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
route.put(
	'/update-avatar',
	isAuthenticated,
	validate(updateAvatarSchema),
	asyncHandler(UserController.handleUpdateProfilePictutre),
)

/**
 * Updates user role.
 * @swagger
 * /update-role:
 *   put:
 *     summary: Update user role
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User role update details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRole'
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 *       500:
 *         description: Internal server error
 */
route.put(
	'/update-role',
	isAuthenticated,
	validate(updateRoleSchema),
	authorizedRoles(env.ADMIN_ROLE as string),
	asyncHandler(UserController.handleUpdateRole),
)

/**
 * Blocks a user.
 * @swagger
 * /block-user/{id}:
 *   put:
 *     summary: Block a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User blocked successfully
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 *       500:
 *         description: Internal server error
 */
route.put(
	'/block-user/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validateParams(),
	asyncHandler(UserController.handleBlockUser),
)

module.exports = route
