import { NextFunction, Request, Response } from 'express'
import orderService from '../services/order.service'
import { OkResponse } from '../utils/success.response'

class OrderController {
	async createOrder(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await orderService.handleCreateOrder(
				req.user?._id,
				req.body,
				next,
			),
		}).send(res)
	}

	async getAllOrders(req: Request, res: Response, next: NextFunction) {
		return new OkResponse({
			metaData: await orderService.getAllOrders(),
		}).send(res)
	}
}

export default new OrderController()
