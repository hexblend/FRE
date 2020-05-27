import {GET_MESSAGES, UPDATE_MESSAGES_FROM} from '../constants/action-types';

const initialState = {
    messages: [],
    viewMessagesFrom: '',
};

const MessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return {...state, messages: action.payload};
        case UPDATE_MESSAGES_FROM:
            return {...state, viewMessagesFrom: action.payload};
        default:
            return state;
    }
};

export default MessagesReducer;
