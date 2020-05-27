import React, {useEffect} from 'react';
import Button from '../components/elements/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateHeaderView} from '../redux/actions/HeaderActions';

export const Messages = props => {
    const {updateHeaderView, messages, loggedUser} = props;

    useEffect(() => {
        updateHeaderView('messages');
    }, [updateHeaderView]);

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
                        to={`/profile/${loggedUser._id}/messages/new`}
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
});

const mapDispatchToProps = dispatch => ({
    updateHeaderView: str => dispatch(updateHeaderView(str)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
