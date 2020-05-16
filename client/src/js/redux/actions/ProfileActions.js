import { UPDATE_PROFILE } from '../constants/action-types';

export function updateProfile(payload) {
	return { type: UPDATE_PROFILE, payload };
}
