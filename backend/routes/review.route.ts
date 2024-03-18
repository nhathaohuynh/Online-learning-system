import express from 'express'
import { env } from '../config/env.config'
import reviewController from '../controllers/review.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'
import validate from '../validations'
import { reviewBodySchema } from '../validations/review.schema'

const route = express.Router()

/**
 * Route for getting reviews.
 *
 * @swagger
 * /api/v1/OnlineLS/review/get-reviews:
 *   get:
 *     summary: Get reviews.
 *     tags:
 *       - Review
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

route.post(
	'/',
	isAuthenticated,
	authorizedRoles(env.USER_ROLE as string),
	validate(reviewBodySchema),
	catchAsyncHandler(reviewController.handleAddReview),
)
module.exports = route
