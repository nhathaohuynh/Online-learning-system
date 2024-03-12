import { IBodyReview } from '../../utils/types'
import reviewModel from '../review.model'

export const createNewReview = async (
	payload: Pick<IBodyReview, 'comment'> & { user: string; rating: number },
) => {
	return reviewModel.create(payload)
}
