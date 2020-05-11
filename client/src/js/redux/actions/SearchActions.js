import {
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
	UPDATE_TAGS_INPUT_ERROR,
	UPDATE_SEARCH_LOCATION,
	UPDATE_LOCATION_INPUT_ERROR,
} from '../constants/action-types';

export function addSearchTag(payload) {
	return { type: ADD_SEARCH_TAG, payload };
}
export function removeSearchTag(payload) {
	return { type: REMOVE_SEARCH_TAG, payload };
}
export function updateTagsInputError(payload) {
	return { type: UPDATE_TAGS_INPUT_ERROR, payload };
}
export function updateSearchLocation(payload) {
	return { type: UPDATE_SEARCH_LOCATION, payload };
}
export function updateLocationInputError(payload) {
	return { type: UPDATE_LOCATION_INPUT_ERROR, payload };
}
