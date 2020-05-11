import {
	UPDATE_TAGS_INPUT,
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
	UPDATE_TAGS_INPUT_ERROR,
	UPDATE_TAGS_INPUT_SUGGESTIONS,
	UPDATE_SEARCH_LOCATION,
	UPDATE_LOCATION_INPUT_ERROR,
	UPDATE_LOCATION_INPUT_SUGGESTIONS,
} from '../constants/action-types';

const initialState = {
	// Tags input
	tagsInput: '',
	searchTags: [],
	tagsLeft: 3,
	tagsInputError: '',
	tagsInputSuggestions: [],
	// Location
	searchLocation: '',
	locationInputError: '',
	locationInputSuggestions: [],
};

function SearchReducer(state = initialState, action) {
	switch (action.type) {
		// Tags input
		case UPDATE_TAGS_INPUT:
			return { ...state, tagsInput: action.payload };
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
		case UPDATE_TAGS_INPUT_SUGGESTIONS:
			return {
				...state,
				tagsInputSuggestions: action.payload,
			};
		// Location input
		case UPDATE_SEARCH_LOCATION:
			return { ...state, searchLocation: action.payload };
		case UPDATE_LOCATION_INPUT_ERROR:
			return { ...state, locationInputError: action.payload };
		case UPDATE_LOCATION_INPUT_SUGGESTIONS:
			return {
				...state,
				locationInputSuggestions: action.payload,
			};
		default:
			return state;
	}
}

export default SearchReducer;
