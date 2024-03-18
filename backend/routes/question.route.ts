/**
 * Express router for handling question-related endpoints.
 * @swagger
 * tags:
 *   name: Questions
 *   description: API endpoints for managing questions
 * paths:
 *   /api/v1/OnlineLS/question/asking:
 *     post:
 *       summary: Add a new question
 *       tags: [Questions]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       responses:
 *         '200':
 *           description: Successfully added the question
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal server error
 *   /api/v1/OnlineLS/question/replying:
 *     post:
 *       summary: Answer a question
 *       tags: [Questions]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       responses:
 *         '200':
 *           description: Successfully answered the question
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal server error
 */
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
