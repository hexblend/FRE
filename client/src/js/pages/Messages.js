import React, {useEffect} from 'react';
import axios from 'axios';
import Button from '../components/elements/Button';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {updateHeaderView} from '../redux/actions/HeaderActions';
import {getMessages} from '../redux/actions/MessagesActions';

export const Messages = props => {
    const {
        updateHeaderView,
        messages,
        getMessages,
        viewMessagesFrom,
        loggedUser,
    } = props;

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        updateHeaderView('messages');
    }, [updateHeaderView]);
    useEffect(() => {
        console.log(messages);
    }, [messages]);

    return (
        <div className="Messages">
            {messages.length !== 0 ? (
                <>
                    {messages.map(message => (
                        <div
                            className={`SingleMessage ${message.from ===
                                loggedUser._id && 'sent'}`}
                            key={message._id}>
                            <p className="SingleMessage__text">
                                {message.body}
                            </p>
                        </div>
                    ))}
                    <Link
                        to={`/profile/${viewMessagesFrom}/messages/new`}
                        className="newMessageBtn">
                        <Button type="full-width" text="Write a message" />
                    </Link>
                </>
            ) : (
                <div className="InfoBar">
                    <p>No conversations found.</p>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    messages: state.MessagesReducer.messages,
    loggedUser: state.AuthReducer.loggedUser,
    viewMessagesFrom: state.MessagesReducer.viewMessagesFrom,
});

const mapDispatchToProps = dispatch => ({
    updateHeaderView: str => dispatch(updateHeaderView(str)),
    getMessages: array => dispatch(getMessages(array)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
