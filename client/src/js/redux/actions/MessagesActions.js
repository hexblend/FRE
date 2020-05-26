import { GET_MESSAGES } from '../constants/action-types';

export function getMessages(payload) {
	return { type: GET_MESSAGES, payload };
}
