import {
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
	UPDATE_SEARCH_LOCATION,
} from '../constants/action-types';

export function addSearchTag(payload) {
	return { type: ADD_SEARCH_TAG, payload };
}
export function removeSearchTag(payload) {
	return { type: REMOVE_SEARCH_TAG, payload };
}
export function updateSearchLocation(payload) {
	return { type: UPDATE_SEARCH_LOCATION, payload };
}
