import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {updateHeaderView} from '../redux/actions/HeaderActions';

const SendMessage = props => {
    const {updateHeaderView, loggedUser} = props;

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
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
