import express from 'express'
import { env } from '../config/env.config'
import courseController from '../controllers/course.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'
import validate, { validateBodyAndParams, validateParams } from '../validations'
import { courseSchema, editCourseSchema } from '../validations/course.schema'

/**
 * Express router for the course endpoints.
 * @swagger
 * tags:
 *   name: Course
 *   description: API endpoints for managing courses.
 *   basePath: /api/v1/OnlineLS/course
 */

const route = express.Router()

/**
 * Create a new course.
 * @swagger
 * /api/v1/OnlineLS/course/:
 *   post:
 *     summary: Create a new course.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: The created course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
route.post(
	'/',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validate(courseSchema),
	catchAsyncHandler(courseController.hanleCreateNewCourse),
)

/**
 * Get a course for a valid user.
 * @swagger
 * /api/v1/OnlineLS/course/valid-user/{id}:
 *   get:
 *     summary: Get a course for a valid user.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The course for the valid user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
route.get(
	'/valid-user/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string, env.ADMIN_ROLE as string),
	validateParams(),
	catchAsyncHandler(courseController.getCourseValidUser),
)

/**
 * Edit a course.
 * @swagger
 * /api/v1/OnlineLS/course/{id}:
 *   put:
 *     summary: Edit a course.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditCourse'
 *     responses:
 *       200:
 *         description: The edited course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
route.put(
	'/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validateBodyAndParams(editCourseSchema),
	catchAsyncHandler(courseController.handleEditCourse),
)

/**
 * Get a single course.
 * @swagger
 * /api/v1/OnlineLS/course/{id}:
 *   get:
 *     summary: Get a single course.
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
route.get(
	'/:id',
	validateParams(),
	catchAsyncHandler(courseController.getSingleCourse),
)

/**
 * Get all courses.
 * @swagger
 * /api/v1/OnlineLS/course/:
 *   get:
 *     summary: Get all courses.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
route.get(
	'/',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	catchAsyncHandler(courseController.getAllCourses),
)

/**
 * Delete a course.
 * @swagger
 * /api/v1/OnlineLS/course/{id}:
 *   delete:
 *     summary: Delete a course.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Course deleted successfully.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
route.delete(
	'/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validateParams(),
	catchAsyncHandler(courseController.deleteCourse),
)

module.exports = route
