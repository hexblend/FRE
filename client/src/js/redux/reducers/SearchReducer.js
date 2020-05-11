import {
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
	UPDATE_TAGS_INPUT_ERROR,
	UPDATE_SEARCH_LOCATION,
	UPDATE_LOCATION_INPUT_ERROR,
} from '../constants/action-types';

const initialState = {
	searchTags: [],
	tagsLeft: 3,
	tagsInputError: '',

	searchLocation: '',
	locationInputError: '',
};

function SearchReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_SEARCH_TAG:
			return {
				...state,
				searchTags: [...state.searchTags, action.payload],
				tagsLeft: state.tagsLeft - 1,
			};
		case REMOVE_SEARCH_TAG:
			return {
				...state,
				searchTags: [
					...state.searchTags.slice(0, action.payload),
					...state.searchTags.slice(action.payload + 1),
				],
				tagsLeft: state.tagsLeft + 1,
			};
		case UPDATE_TAGS_INPUT_ERROR:
			return { ...state, tagsInputError: action.payload };

		case UPDATE_SEARCH_LOCATION:
			return { ...state, searchLocation: action.payload };
		case UPDATE_LOCATION_INPUT_ERROR:
			return { ...state, locationInputError: action.payload };
		default:
			return state;
	}
}

export default SearchReducer;
