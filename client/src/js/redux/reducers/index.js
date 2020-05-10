import {
	ADD_ARTICLE,
	DATA_LOADED,
	ADD_LOGGED_USER,
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
	UPDATE_SEARCH_LOCATION,
} from '../constants/action-types';

const initialState = {
	articles: [],
	remoteArticles: [],
	loggedUser: {},
	// Search
	searchTags: [],
	searchLocation: '',
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_ARTICLE:
			return Object.assign({}, state, {
				articles: state.articles.concat(action.payload),
			});
		case DATA_LOADED:
			return Object.assign({}, state, {
				remoteArticles: state.remoteArticles.concat(action.payload),
			});
		case ADD_LOGGED_USER:
			return { ...state, loggedUser: action.payload };
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

export default rootReducer;
