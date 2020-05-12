import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import ProfileReducer from './ProfileReducer';

export default combineReducers({
	AuthReducer,
	SearchReducer,
	ProfileReducer,
});
