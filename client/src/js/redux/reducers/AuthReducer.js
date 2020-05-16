import {
	ADD_LOGGED_USER,
	UPDATE_LOGGED_FULLNAME,
	UPDATE_LOGGED_FULLNAME_ERROR,
	SET_UPDATE_FORM_SUBMITTED,
} from '../constants/action-types';

const initialState = {
	loggedUser: {},
	updatedLoggedUser: {
		full_name: '',

		errors: {
			full_name: '',
		},

		formSubmitted: false,
	},
};

function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_LOGGED_USER:
			return { ...state, loggedUser: action.payload };
		case UPDATE_LOGGED_FULLNAME:
			return {
				...state,
				updatedLoggedUser: {
					...state.updatedLoggedUser,
					full_name: action.payload,
				},
			};
		case UPDATE_LOGGED_FULLNAME_ERROR: {
			return {
				...state,
				updatedLoggedUser: {
					...state.updatedLoggedUser,
					errors: {
						...state.updatedLoggedUser.errors,
						full_name: action.payload,
					},
				},
			};
		}
		case SET_UPDATE_FORM_SUBMITTED: {
			return {
				...state,
				updatedLoggedUser: {
					...state.updatedLoggedUser,
					formSubmitted: action.payload,
				},
			};
		}
		default:
			return state;
	}
}

export default AuthReducer;
