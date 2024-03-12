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
