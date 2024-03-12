import express from 'express'
import { env } from '../config/env.config'
import orderController from '../controllers/order.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'
import validate from '../validations'
import { createOrderSchema } from '../validations/order.schema'

const route = express.Router()

route.post(
	'/',
	isAuthenticated,
	authorizedRoles(env.USER_ROLE as string),
	validate(createOrderSchema),
	catchAsyncHandler(orderController.createOrder),
)

route.get(
	'/',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	catchAsyncHandler(orderController.getAllOrders),
)
module.exports = route
