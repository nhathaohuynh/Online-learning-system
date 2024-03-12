import express from 'express'
import { env } from '../config/env.config'
import questionController from '../controllers/question.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'
import validate from '../validations'
import { anwserSchema, questionSchema } from '../validations/question.schema'

const route = express.Router()

route.post(
	'/asking',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string, env.USER_ROLE as string),
	validate(questionSchema),
	catchAsyncHandler(questionController.handleAddQuestion),
)

route.post(
	'/replying',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string, env.USER_ROLE as string),
	validate(anwserSchema),
	catchAsyncHandler(questionController.handleAnwserQuestion),
)

module.exports = route
