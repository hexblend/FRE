import {
	ADD_LOGGED_USER,
	UPDATE_LOGGED_FIELD,
	UPDATE_LOGGED_FIELD_ERROR,
	UPDATE_LOGGED_OBJ_FIELD,
	UPDATE_LOGGED_OBJ_FIELD_ERROR,
	UPDATE_LOGGED_KEY_IN_OBJ,
	ADD_LOGGED_OBJ,
	DELETE_LOGGED_OBJ,
	SET_UPDATE_FORM_SUBMITTED,
} from '../constants/action-types';

export function addLoggedUser(payload) {
	return { type: ADD_LOGGED_USER, payload };
}
export function updateLoggedField(payload) {
	return { type: UPDATE_LOGGED_FIELD, payload };
}
export function updateLoggedFieldError(payload) {
	return { type: UPDATE_LOGGED_FIELD_ERROR, payload };
}
export function updateLoggedObjField(payload) {
	return { type: UPDATE_LOGGED_OBJ_FIELD, payload };
}
export function updateLoggedObjFieldError(payload) {
	return { type: UPDATE_LOGGED_OBJ_FIELD_ERROR, payload };
}
export function addLoggedObj(payload) {
	return { type: ADD_LOGGED_OBJ, payload };
}
export function updateLoggedKeyinObj(payload) {
	return { type: UPDATE_LOGGED_KEY_IN_OBJ, payload };
}
export function deleteLoggedObj(payload) {
	return { type: DELETE_LOGGED_OBJ, payload };
}
export function setUpdateFormSubmitted(payload) {
	return { type: SET_UPDATE_FORM_SUBMITTED, payload };
}
