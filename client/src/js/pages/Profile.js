import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import isEmpty from '../components/isEmpty';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
});

const ConnectedProfile = ({ loggedUser }) => {
	const history = useHistory();

	useEffect(() => {
		const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
		if (isEmpty(loggedUser)) {
			history.push(`${PUBLIC_URL}/candidate/login`);
		}
	}, [history, loggedUser]);

	return (
		<div className="Profile">
			<h1>Hello</h1>
		</div>
	);
};

const Profile = connect(mapStateToProps)(ConnectedProfile);
export default Profile;
