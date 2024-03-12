import mongoose, { Document, Model, ObjectId, Schema, Types } from 'mongoose'

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

export interface IOrder extends Document {
	courserId: ObjectId
	userId: ObjectId
	totalPrice: number
	paymentInfo: Object
}

const orderSchema = new Schema<IOrder>(
	{
		courserId: Types.ObjectId,
		userId: Types.ObjectId,
		paymentInfo: {
			type: Object,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const orderModel: Model<IOrder> = mongoose.model<IOrder>(
	DOCUMENT_NAME,
	orderSchema,
)

export default orderModel
