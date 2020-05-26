import { GET_MESSAGES } from '../constants/action-types';

const initialState = {
	messages: [],
};

const MessagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MESSAGES:
			return { ...state, messages: action.payload };
		default:
			return state;
	}
};

export default MessagesReducer;
