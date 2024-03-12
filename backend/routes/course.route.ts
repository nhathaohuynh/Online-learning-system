import express from 'express'
import { env } from '../config/env.config'
import courseController from '../controllers/course.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'
import validate, { validateBodyAndParams, validateParams } from '../validations'
import { courseSchema, editCourseSchema } from '../validations/course.schema'

const route = express.Router()

route.post(
	'/',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validate(courseSchema),
	catchAsyncHandler(courseController.hanleCreateNewCourse),
)

route.get(
	'/valid-user/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string, env.ADMIN_ROLE as string),
	validateParams(),
	catchAsyncHandler(courseController.getCourseValidUser),
)

route.put(
	'/:id',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	validateBodyAndParams(editCourseSchema),
	catchAsyncHandler(courseController.handleEditCourse),
)

route.get(
	'/:id',
	validateParams(),
	catchAsyncHandler(courseController.getSingleCourse),
)

route.get(
	'/',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	catchAsyncHandler(courseController.getAllCourses),
)

module.exports = route
