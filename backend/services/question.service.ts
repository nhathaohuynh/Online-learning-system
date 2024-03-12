import { NextFunction } from 'express'
import { ObjectId } from 'mongoose'
import sendMail from '../mails/sendMail'
import { findDataCourseById } from '../models/repository/dataCourse.repo'
import {
	addNewQuestion,
	findQuestionById,
} from '../models/repository/question.repo'
import { findUserById } from '../models/repository/user.repo'
import { BadRequest } from '../utils/error.response'
import { IBodyQuestion } from '../utils/types'

class QuestionService {
	async handleAddQuestion(userId: string, body: IBodyQuestion) {
		const dataCourse = await findDataCourseById(body.dataCourseId)

		if (!dataCourse) throw new BadRequest('Data course id does not exist.')

		const payload = {
			...body,
			user: userId,
		}

		const newQuestion = await addNewQuestion(payload)

		if (!newQuestion) throw new BadRequest('Occuring with asking question.')

		dataCourse.questions.push(newQuestion._id)

		await dataCourse.save()

		return {
			question: newQuestion,
		}
	}

	async handleReplyQuestion(
		userId: string,
		body: IBodyQuestion & { questionId: string },
		next: NextFunction,
	) {
		const question = await findQuestionById(body.questionId)

		if (!question) throw new BadRequest('Question does not exist.')

		const payload = {
			content: body.content,
			dataCourseId: body.dataCourseId,
			user: userId,
		}

		const newQuestion = await addNewQuestion(payload)
		if (!newQuestion) throw new BadRequest('Occuring with anwser question.')

		question.contentReplies.push(newQuestion._id)
		await question.save()

		if (userId === JSON.stringify(question?.user)) {
			//create notification
			console.log()
		} else {
			const user = await findUserById(question?.user.toString())
			if (!user) throw new BadRequest('Occuring with fetching user.')
			const data = {
				name: user?.name,
			}

			try {
				console.log(user?.email)
				await sendMail({
					email: user?.email,
					subject: 'Question reply',
					template: 'questionReply.ejs',
					data,
				})
			} catch (err: any) {
				next(new BadRequest(err.message))
			}
		}

		return {
			anwser: newQuestion,
		}
	}
}

export default new QuestionService()
