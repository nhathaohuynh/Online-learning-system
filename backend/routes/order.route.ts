/**
 * Express router for handling order-related endpoints.
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints for managing orders
 * paths:
 *   /api/v1/OnlineLS/order/:
 *     post:
 *       summary: Create a new order
 *       tags: [Order]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateOrderInput'
 *       responses:
 *         '200':
 *           description: OK
 *     get:
 *       summary: Get all orders
 *       tags: [Order]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: OK
 */
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
