import { UPDATE_HEADER_VIEW } from '../constants/action-types';

export function updateHeaderView(payload) {
	return { type: UPDATE_HEADER_VIEW, payload };
}
