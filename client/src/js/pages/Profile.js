import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
});

const ConnectedProfile = ({ loggedUser }) => {
	return (
		<div className="Profile">
			<h1>Hello</h1>
		</div>
	);
};

const Profile = connect(mapStateToProps)(ConnectedProfile);
export default Profile;
