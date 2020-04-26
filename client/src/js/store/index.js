import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import { forbiddenWordsMiddleware } from '../middleware/index';
import thunk from 'redux-thunk';

const store = createStore(
	rootReducer,
	applyMiddleware(forbiddenWordsMiddleware, thunk)
);

export default store;
