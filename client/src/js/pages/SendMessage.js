import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';

import isEmpty from '../components/isEmpty';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';

import {connect} from 'react-redux';
import {updateHeaderView} from '../redux/actions/HeaderActions';

const SendMessage = props => {
    const {updateHeaderView, loggedUser, profile} = props;
    const [newMessage, setNewMessage] = useState('');
    const [messageError, setMessageError] = useState('');

    const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
    const history = useHistory();

    // Go to profile if is not set
    useEffect(() => {
        const url = window.location.href;
        const profileID = props.match.params.id;
        if (url.includes('/profile/') && isEmpty(profile)) {
            history.push(`${PUBLIC_URL}/profile/${profileID}`);
        }
    }, []);

    // Update header title
    useEffect(() => {
        updateHeaderView('sendMessage');
    }, [updateHeaderView]);

    const handleMessageSend = () => {
        if (newMessage === '') {
            setMessageError("You can't send and empty message");
        } else {
            setMessageError('');
            console.log(newMessage);
        }
    };
    return (
        <>
            <div className="SendMessage">
                <Input
                    id="newMessage"
                    type="textarea"
                    placeholder="Your new message"
                    minWidth="100%"
                    label="Write a new message:"
                    value={newMessage}
                    handleChange={setNewMessage}
                    error={messageError}
                />
            </div>
            <div className="newMessageBtn" onClick={handleMessageSend}>
                <Button type="full-width" text="Send message" />
            </div>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    updateHeaderView: str => dispatch(updateHeaderView(str)),
});

const mapStateToProps = state => ({
    loggedUser: state.AuthReducer.loggedUser,
    profile: state.ProfileReducer.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
