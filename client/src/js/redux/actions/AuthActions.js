import {
	ADD_LOGGED_USER,
	UPDATE_LOGGED_FULLNAME,
	UPDATE_LOGGED_FULLNAME_ERROR,
	SET_UPDATE_FORM_SUBMITTED,
} from '../constants/action-types';

export function addLoggedUser(payload) {
	return { type: ADD_LOGGED_USER, payload };
}
export function updateLoggedFullName(payload) {
	return { type: UPDATE_LOGGED_FULLNAME, payload };
}
export function updateLoggedFullNameError(payload) {
	return { type: UPDATE_LOGGED_FULLNAME_ERROR, payload };
}
export function setUpdateFormSubmitted(payload) {
	return { type: SET_UPDATE_FORM_SUBMITTED, payload };
}
