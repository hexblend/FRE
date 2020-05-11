import { ADD_LOGGED_USER } from '../constants/action-types';

const initialState = {
	loggedUser: {},
};

function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_LOGGED_USER:
			return { ...state, loggedUser: action.payload };
		default:
			return state;
	}
}

export default AuthReducer;
