import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import ProfileReducer from './ProfileReducer';
import HeaderReducer from './HeaderReducer';

export default combineReducers({
	AuthReducer,
	SearchReducer,
	ProfileReducer,
	HeaderReducer,
});
