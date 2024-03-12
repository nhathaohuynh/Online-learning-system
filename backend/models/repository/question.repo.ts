import { IBodyQuestion } from '../../utils/types'
import questionModel from '../question.model'

export const addNewQuestion = async (
	payload: IBodyQuestion & { user: string },
) => {
	return await questionModel.create(payload)
}

export const findQuestionById = async (questionId: string) => {
	return await questionModel.findById(questionId)
}
