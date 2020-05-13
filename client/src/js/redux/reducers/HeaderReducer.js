import { UPDATE_HEADER_VIEW } from '../constants/action-types';

const initialState = {
	view: '',
};

function HeaderReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_HEADER_VIEW:
			return { ...state, view: action.payload };
		default:
			return state;
	}
}

export default HeaderReducer;
