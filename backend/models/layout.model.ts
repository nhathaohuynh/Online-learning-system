import { IPicture } from './picture.model'
// create model layout

import { Document, Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'Layout'
const COLLECTION_NAME = 'Layouts'

interface FaqItem extends Document {
	question: string
	answer: string
}

interface Category extends Document {
	title: string
}

interface Layout extends Document {
	type: string
	faqs: FaqItem[]
	categories: Category[]
	bannerImages: {
		image: string
		title: string
		subTitle: string
	}
}

const faqSchema = new Schema<FaqItem>({
	question: {
		type: String,
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
})

const categorySchema = new Schema<Category>({
	title: {
		type: String,
		required: true,
	},
})

const layoutSchema = new Schema<Layout>(
	{
		type: {
			type: String,
			required: true,
		},
		faqs: [faqSchema],
		categories: [categorySchema],
		bannerImages: {
			image: {
				type: Schema.ObjectId,
				ref: 'Pictrue',
			},
			title: {
				type: String,
			},
			subTitle: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const LayoutModel = model<Layout>(DOCUMENT_NAME, layoutSchema)

export default LayoutModel
