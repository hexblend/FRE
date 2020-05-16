import { UPDATE_PROFILE } from '../constants/action-types';

const initialState = {
	profile: {},
};

function ProfileReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_PROFILE:
			return { ...state, profile: action.payload };
		default:
			return state;
	}
}

export default ProfileReducer;
