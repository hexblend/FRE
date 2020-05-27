import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {updateHeaderView} from '../redux/actions/HeaderActions';
import isEmpty from '../components/isEmpty';

const SendMessage = props => {
    const {updateHeaderView, loggedUser, profile} = props;
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

    return (
        <div className="SendMessage">
            <h1>Send messages page</h1>
        </div>
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
