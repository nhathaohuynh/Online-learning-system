import express from 'express'
import { env } from '../config/env.config'
import reviewController from '../controllers/review.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'
import validate from '../validations'
import { reviewBodySchema } from '../validations/review.schema'

const route = express.Router()

route.post(
	'/',
	isAuthenticated,
	authorizedRoles(env.USER_ROLE as string),
	validate(reviewBodySchema),
	catchAsyncHandler(reviewController.handleAddReview),
)
module.exports = route
