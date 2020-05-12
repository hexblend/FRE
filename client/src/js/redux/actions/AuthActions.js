import { ADD_LOGGED_USER } from '../constants/action-types';

export function addLoggedUser(payload) {
	return { type: ADD_LOGGED_USER, payload };
}
