import {
    GET_MESSAGES,
    UPDATE_MESSAGES_FROM,
    ADD_MESSAGE,
} from '../constants/action-types';

export function getMessages(payload) {
    return {type: GET_MESSAGES, payload};
}

export function updateMessagesFrom(payload) {
    return {type: UPDATE_MESSAGES_FROM, payload};
}
export function addMessage(payload) {
    return {type: ADD_MESSAGE, payload};
}
