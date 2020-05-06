import {
	ADD_ARTICLE,
	DATA_LOADED,
	ADD_LOGGED_USER,
} from '../constants/action-types';

const initialState = {
	articles: [],
	remoteArticles: [],
	loggedUser: {},
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

	return state;
}

export default rootReducer;
