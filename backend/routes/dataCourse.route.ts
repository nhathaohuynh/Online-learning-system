import express from 'express'
import { env } from 'process'
import dataCourseController from '../controllers/dataCourse.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'
import { validateBodyAndParams } from '../validations'
import { updateDataCourseSchema } from '../validations/dataCourse.schema'
const route = express.Router()

route.put(
	'/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validateBodyAndParams(updateDataCourseSchema),
	catchAsyncHandler(dataCourseController.handleUpdateDataCourse),
)

module.exports = route
