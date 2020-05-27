import {
	ADD_LOGGED_USER,
	UPDATE_LOGGED_FIELD,
	UPDATE_LOGGED_FIELD_ERROR,
	UPDATE_LOGGED_OBJ_FIELD,
	UPDATE_LOGGED_KEY_IN_OBJ,
	ADD_LOGGED_OBJ,
	DELETE_LOGGED_OBJ,
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
		key_abilities: [],
		experience: [],
		projects: [],
		company: {
			name: '',
			type: '',
			website: '',
		},
		available_positions: [],
		social_media: {
			facebook: '',
			twitter: '',
			linkedin: '',
			instagram: '',
			github: '',
			behance: '',
			personal_website: '',
		},

		errors: {
			full_name: '',
			email: '',
			job_title: '',
			city: '',
			years_of_activity: '',
			company_name: '',
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
				loggedUser: {
					...state.loggedUser,
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
		case UPDATE_LOGGED_OBJ_FIELD: {
			return {
				...state,
				loggedUser: {
					...state.loggedUser,
					[action.payload.array]: state.loggedUser[action.payload.array].map((field) =>
						field._id === action.payload.id
							? {
									...field,
									[action.payload.fieldName]: action.payload.fieldValue,
							  }
							: field
					),
				},
			};
		}
		case UPDATE_LOGGED_KEY_IN_OBJ:
			return {
				...state,
				loggedUser: {
					...state.loggedUser,
					[action.payload.object]: {
						...state.loggedUser[action.payload.object],
						[action.payload.key]: action.payload.value,
					},
				},
				updatedLoggedUser: {
					...state.updatedLoggedUser,
					[action.payload.object]: {
						...state.updatedLoggedUser[action.payload.object],
						[action.payload.key]: action.payload.value,
					},
				},
			};
		case ADD_LOGGED_OBJ:
			return {
				...state,
				loggedUser: {
					...state.loggedUser,
					[action.payload.array]: [
						action.payload.object,
						...state.loggedUser[action.payload.array],
					],
				},
			};
		case DELETE_LOGGED_OBJ:
			return {
				...state,
				loggedUser: {
					...state.loggedUser,
					[action.payload.array]: state.loggedUser[action.payload.array].filter(
						(item) =>
							state.loggedUser[action.payload.array].indexOf(item) !==
							action.payload.index
					),
				},
			};
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
