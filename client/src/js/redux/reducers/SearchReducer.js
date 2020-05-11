import {
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
	UPDATE_SEARCH_LOCATION,
} from '../constants/action-types';

const initialState = {
	searchTags: [],
	searchLocation: '',
};

function SearchReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_SEARCH_TAG:
			return {
				...state,
				searchTags: [...state.searchTags, action.payload],
			};
		case REMOVE_SEARCH_TAG:
			return {
				...state,
				searchTags: [
					...state.searchTags.slice(0, action.payload),
					...state.searchTags.slice(action.payload + 1),
				],
			};
		case UPDATE_SEARCH_LOCATION:
			return {
				...state,
				searchLocation: action.payload,
			};
		default:
			return state;
	}
}

export default SearchReducer;
