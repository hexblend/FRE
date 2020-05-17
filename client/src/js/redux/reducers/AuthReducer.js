import {
	ADD_LOGGED_USER,
	UPDATE_LOGGED_FIELD,
	UPDATE_LOGGED_FIELD_ERROR,
	SET_UPDATE_FORM_SUBMITTED,
} from '../constants/action-types';

const initialState = {
	loggedUser: {},
	updatedLoggedUser: {
		full_name: '',
		email: '',
		status: '',
		description: '',
		job_title: '',
		city: '',
		years_of_activity: '',
		remote_worker: '',
		higher_education: '',

		errors: {
			full_name: '',
			email: '',
			job_title: '',
			city: '',
			years_of_activity: '',
		},

		formSubmitted: false,
	},
};

function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_LOGGED_USER:
			return { ...state, loggedUser: action.payload };
		case UPDATE_LOGGED_FIELD:
			return {
				...state,
				updatedLoggedUser: {
					...state.updatedLoggedUser,
					[action.payload.fieldName]: action.payload.fieldValue,
				},
			};
		case UPDATE_LOGGED_FIELD_ERROR: {
			return {
				...state,
				updatedLoggedUser: {
					...state.updatedLoggedUser,
					errors: {
						...state.updatedLoggedUser.errors,
						[action.payload.fieldName]: action.payload.error,
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
