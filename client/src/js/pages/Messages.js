import React, {useEffect, createRef} from 'react';
import Button from '../components/elements/Button';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {updateHeaderView} from '../redux/actions/HeaderActions';

export const Messages = props => {
    const {updateHeaderView, messages, viewMessagesFrom, loggedUser} = props;

    const lastItemRef = createRef();

    useEffect(() => {
        updateHeaderView('messages');
        lastItemRef.current && lastItemRef.current.scrollIntoView();
    }, [updateHeaderView, lastItemRef]);

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
                    <div ref={lastItemRef}></div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
