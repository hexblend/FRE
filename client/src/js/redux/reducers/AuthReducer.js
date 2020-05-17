import {
	ADD_LOGGED_USER,
	UPDATE_LOGGED_FIELD,
	UPDATE_LOGGED_FIELD_ERROR,
	UPDATE_LOGGED_OBJ_FIELD,
	UPDATE_LOGGED_OBJ_FIELD_ERROR,
	ADD_LOGGED_OBJ,
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

		errors: {
			full_name: '',
			email: '',
			job_title: '',
			city: '',
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
		case UPDATE_LOGGED_OBJ_FIELD: {
			return {
				...state,
				updatedLoggedUser: {
					...state.updatedLoggedUser,
					experience: state.updatedLoggedUser.experience.map((experience) =>
						experience._id === action.payload.id
							? {
									...experience,
									[action.payload.fieldName]: action.payload.fieldValue,
							  }
							: experience
					),
				},
			};
		}
		case ADD_LOGGED_OBJ:
			const array = action.payload.array;
			const object = action.payload.object;
			return {
				...state,
				updatedLoggedUser: {
					...state.updatedLoggedUser,
					[array]: [object, ...state.updatedLoggedUser[array]],
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
