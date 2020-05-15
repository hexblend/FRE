import {
	UPDATE_PROFILE,
	UPDATE_LOGGED_PROFILE,
} from '../constants/action-types';

export function updateProfile(payload) {
	return { type: UPDATE_PROFILE, payload };
}
export function updateLoggedProfile(payload) {
	return { type: UPDATE_LOGGED_PROFILE, payload };
}
