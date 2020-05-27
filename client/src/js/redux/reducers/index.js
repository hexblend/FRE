import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import ProfileReducer from './ProfileReducer';
import HeaderReducer from './HeaderReducer';
import MessagesReducer from './MessagesReducer';

import { UPDATE_LOADING } from '../constants/action-types';

const initialState = {
	loading: true,
};

function RootReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_LOADING:
			return { ...state, loading: action.payload };
		default:
			return state;
	}
}

export default combineReducers({
	RootReducer,
	AuthReducer,
	SearchReducer,
	ProfileReducer,
	HeaderReducer,
	MessagesReducer,
});
