import { IBodyOrder } from '../../utils/types'
import orderModel from '../order.model'

export const insertOrder = async (payload: IBodyOrder & { userId: string }) => {
	return await orderModel.create(payload)
}

export const findAllOrders = async () => {
	return await orderModel.find().lean()
}
