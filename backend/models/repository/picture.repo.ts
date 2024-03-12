import { FlattenMaps, Types } from 'mongoose'
import pictureModel, { IPicture } from '../picture.model'

export const createNewPicture = async (payload: IPicture) => {
	return await pictureModel.create(payload)
}

export const findPictureByIdAndUpdate = async (
	pictureId: Types.ObjectId,
	payload: IPicture,
): Promise<any> => {
	return await pictureModel
		.findByIdAndUpdate(
			pictureId,
			{ $set: payload },
			{
				new: true,
				upsert: true,
			},
		)
		.lean()
}
