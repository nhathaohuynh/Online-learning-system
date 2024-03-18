import cloudinary from 'cloudinary'
import { isTemplateExpression } from 'typescript'
import LayoutModel from '../models/layout.model'
import { IPicture } from '../models/picture.model'
import { createNewPicture } from '../models/repository/picture.repo'
import { BadRequest } from '../utils/error.response'
// class Layout

class LayoutService {
	// create layout
	async createLayout(payload: any) {
		const { type } = payload

		const isTypeExist = await LayoutModel.findOne({ type })

		if (isTypeExist) {
			return new BadRequest('Type is already exist')
		}

		if (type === 'FAQ') {
			const { faq } = payload
			const faqItems = faq.map((el: { question: string; answer: string }) => {
				return {
					question: el.question,
					answer: el.answer,
				}
			})
			await LayoutModel.create({ type: 'FAQ', faqs: faqItems })
		}

		if (type === 'Banner') {
			const { image, title, subTitle } = payload

			const myCloud = await cloudinary.v2.uploader.upload(image, {
				folder: 'layout',
			})

			const body = {
				publicId: myCloud.public_id,
				url: myCloud.secure_url,
			} as IPicture

			const picture = await createNewPicture(body)

			const banner = {
				image: picture._id,
				title,
				subTitle,
			}

			await LayoutModel.create({ type: 'Banner', bannerImages: banner })
		}

		if (type === 'Categories') {
			const { categories } = payload

			const categoryItems = categories.map((el: { title: string }) => {
				return {
					title: el.title,
				}
			})
			await LayoutModel.create({
				type: 'Categories',
				categories: categoryItems,
			})
		}
	}

	async editLayout(payload: any) {
		const { type } = payload

		if (type === 'FAQ') {
			const { faq } = payload
			const faqItems = faq.map((el: { question: string; answer: string }) => {
				return {
					question: el.question,
					answer: el.answer,
				}
			})
			await LayoutModel.findOneAndUpdate(
				{ type: 'FAQ' },
				{ faqs: faqItems },
				{ new: true },
			)
		}

		if (type === 'Banner') {
			const { image, title, subTitle } = payload

			const myCloud = await cloudinary.v2.uploader.upload(image, {
				folder: 'layout',
			})

			const body = {
				publicId: myCloud.public_id,
				url: myCloud.secure_url,
			} as IPicture

			const picture = await createNewPicture(body)

			const banner = {
				image: picture._id,
				title,
				subTitle,
			}

			await LayoutModel.findOneAndUpdate(
				{ type: 'Banner' },
				{ bannerImages: banner },
				{ new: true },
			)
		}

		if (type === 'Categories') {
			const { categories } = payload

			const categoryItems = categories.map((el: { title: string }) => {
				return {
					title: el.title,
				}
			})
			await LayoutModel.findOneAndUpdate(
				{ type: 'Categories' },
				{ categories: categoryItems },
				{ new: true },
			)
		}
	}
}

export default new LayoutService()
