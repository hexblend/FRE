import {
	ADD_ARTICLE,
	DATA_LOADED,
	ADD_LOGGED_USER,
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
} from '../constants/action-types';

const initialState = {
	articles: [],
	remoteArticles: [],
	loggedUser: {},
	searchTags: [],
};

function rootReducer(state = initialState, action) {
	if (action.type === ADD_ARTICLE) {
		return Object.assign({}, state, {
			articles: state.articles.concat(action.payload),
		});
	}

	if (action.type === DATA_LOADED) {
		return Object.assign({}, state, {
			remoteArticles: state.remoteArticles.concat(action.payload),
		});
	}

	if (action.type === ADD_LOGGED_USER) {
		return { ...state.loggedUser, loggedUser: action.payload };
	}

	if (action.type === ADD_SEARCH_TAG) {
		return Object.assign({}, state, {
			searchTags: state.searchTags.concat(action.payload),
		});
	}
	return state;
}

export default rootReducer;
