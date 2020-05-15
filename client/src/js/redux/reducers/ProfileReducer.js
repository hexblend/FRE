import {
	UPDATE_PROFILE,
	UPDATE_LOGGED_PROFILE,
} from '../constants/action-types';

const initialState = {
	profile: {},
	loggedProfile: {},
};

function ProfileReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_PROFILE:
			return { ...state, profile: action.payload };
		case UPDATE_LOGGED_PROFILE:
			return { ...state, loggedProfile: action.payload };
		default:
			return state;
	}
}

export default ProfileReducer;
