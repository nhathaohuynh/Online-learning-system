import _ from 'lodash'

export const selectFields = (obj: Object, fieldsToSelect: string[]) => {
	return _.pick(obj, fieldsToSelect)
}
export const unselectFields = (obj: Object, fieldsToUnselect: string[]) => {
	return _.omit(JSON.parse(JSON.stringify(obj)), fieldsToUnselect)
}
