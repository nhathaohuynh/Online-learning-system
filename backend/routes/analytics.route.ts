import express from 'express'
import { env } from '../config/env.config'
import analyticsController from '../controllers/analytics.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'

/**
 * Express router for handling analytics routes.
 */
const route = express.Router()

/**
 * Route for getting users analytics.
 *
 * @swagger
 * /api/v1/OnlineLS/analytic/get-users-analytics:
 *   get:
 *     summary: Get users analytics.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
route.get(
	'/get-users-analytics',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	catchAsyncHandler(analyticsController.handleGetUserAnalytics),
)

/**
 * Route for getting courses analytics.
 *
 * @swagger
 * /api/v1/OnlineLS/analytic/get-courses-analytics:
 *   get:
 *     summary: Get courses analytics.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
route.get(
	'/get-courses-analytics',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	catchAsyncHandler(analyticsController.handleGetCourseAnalytics),
)

/**
 * Route for getting orders analytics.
 *
 * @swagger
 * /api/v1/OnlineLS/analytic/get-orders-analytics:
 *   get:
 *     summary: Get orders analytics.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
route.get(
	'/get-orders-analytics',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	catchAsyncHandler(analyticsController.handleGetOrderAnalytics),
)

module.exports = route
