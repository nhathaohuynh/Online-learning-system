/**
 * Express router for handling notification routes.
 * @swagger
 * tags:
 *   name: Notification
 *   description: API endpoints for managing notifications
 * paths:
 *   /api/v1/OnlineLS/notification/:
 *     get:
 *       summary: Get all notifications
 *       tags: [Notification]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful response with the list of notifications
 *         '401':
 *           description: Unauthorized request
 *     put:
 *       summary: Update a notification
 *       tags: [Notification]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the notification to update
 *       responses:
 *         '200':
 *           description: Successful response with the updated notification
 *         '401':
 *           description: Unauthorized request
 *         '404':
 *           description: Notification not found
 */
import express from 'express'
import { env } from '../config/env.config'
import notficationController from '../controllers/notfication.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'
import { validateParams } from '../validations'

const route = express.Router()

route.get(
	'/',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	catchAsyncHandler(notficationController.getNotifications),
)

route.put(
	'/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validateParams(),
	catchAsyncHandler(notficationController.updateNotifcation),
)

module.exports = route
