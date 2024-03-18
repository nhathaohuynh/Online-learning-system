import express from 'express'
import { env } from '../config/env.config'
import LayoutController from '../controllers/layout.controller'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth'
import catchAsyncHandler from '../middlewares/catchAsyncHandler'

/**
 * Express router for layout routes.
 * @swagger
 * tags:
 *   name: Layout
 *   description: API endpoints for managing layouts.
 *   basePath: /api/v1/OnlineLS/layout
 */

const route = express.Router()

/**
 * @swagger
 * /create-layout:
 *   post:
 *     summary: Create a new layout.
 *     tags: [Layout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: layout
 *         description: The layout object to create.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Layout'
 *     responses:
 *       200:
 *         description: The created layout object.
 *         schema:
 *           $ref: '#/definitions/Layout'
 *       401:
 *         description: Unauthorized. User must be authenticated and have admin role.
 *       500:
 *         description: Internal server error.
 */
route.post(
	'/create-layout',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	catchAsyncHandler(LayoutController.createLayout),
)

/**
 * @swagger
 * /edit-layout:
 *   put:
 *     summary: Edit an existing layout.
 *     tags: [Layout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: layout
 *         description: The updated layout object.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Layout'
 *     responses:
 *       200:
 *         description: The updated layout object.
 *         schema:
 *           $ref: '#/definitions/Layout'
 *       401:
 *         description: Unauthorized. User must be authenticated and have admin role.
 *       500:
 *         description: Internal server error.
 */
route.put(
	'/edit-layout',
	isAuthenticated,
	authorizedRoles(env.ADMIN_ROLE as string),
	catchAsyncHandler(LayoutController.editLayout),
)

module.exports = route
