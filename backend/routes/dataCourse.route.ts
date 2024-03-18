import express from 'express'
import { env } from 'process'
import dataCourseController from '../controllers/dataCourse.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'
import { validateBodyAndParams } from '../validations'
import { updateDataCourseSchema } from '../validations/dataCourse.schema'

/**
 * Express router for the /api/v1/OnlineLS/data-course endpoint.
 */
const route = express.Router()

/**
 * PUT /api/v1/OnlineLS/data-course/:id
 *
 * Updates a data course by its ID.
 *
 * @route PUT /api/v1/OnlineLS/data-course/:id
 * @group Data Course - Operations related to data courses
 * @param {string} id.path.required - The ID of the data course to update
 * @security JWT
 * @returns {object} 200 - The updated data course
 * @returns {object} 401 - Unauthorized
 * @returns {object} 403 - Forbidden
 * @returns {object} 404 - Not Found
 * @returns {object} 500 - Internal Server Error
 */
route.put(
	'/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validateBodyAndParams(updateDataCourseSchema),
	catchAsyncHandler(dataCourseController.handleUpdateDataCourse),
)

module.exports = route
