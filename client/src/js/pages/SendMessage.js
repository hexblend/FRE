import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';

import isEmpty from '../components/isEmpty';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import Alert from '../layout/Alert';

import {connect} from 'react-redux';
import {updateHeaderView} from '../redux/actions/HeaderActions';
import {updateProfile} from '../redux/actions/ProfileActions';

const SendMessage = props => {
    const {updateHeaderView, loggedUser, profile, updateProfile} = props;
    const [newMessage, setNewMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [alert, setAlert] = useState({type: '', text: ''});

    const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
    const API_URL = process.env.REACT_APP_API_URL;
    const history = useHistory();

    // Update profile on load
    useEffect(() => {
        const profileID = props.match.params.id;
        axios
            .get(`${API_URL}/api/users/${profileID}`, {useCredentials: true})
            .then(res => updateProfile(res.data.user))
            .catch(() => history.send(`${PUBLIC_URL}`));
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

            const newText = {
                from: loggedUser._id,
                message: newMessage,
            };
            axios
                .post(
                    `${API_URL}/api/users/send_message/${profile._id}`,
                    newText,
                    {useCredentials: true},
                )
                .then(() => {
                    setAlert({type: 'success', text: 'Message sent.'});
                    const profileID = props.match.params.id;
                    setTimeout(() => {
                        history.goBack();
                    }, 1500);
                });
        }
    };
    return (
        <>
            <Alert type={alert.type} text={alert.text} />
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
    updateProfile: obj => dispatch(updateProfile(obj)),
});

const mapStateToProps = state => ({
    loggedUser: state.AuthReducer.loggedUser,
    profile: state.ProfileReducer.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
