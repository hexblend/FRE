import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
	AuthReducer,
	SearchReducer,
});
