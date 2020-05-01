import React from 'react';
import PropTypes from 'prop-types';
import AuthNavbar from '../components/AuthNavbar';

function Register({ type }) {
	return (
		<div className="Register">
			<AuthNavbar bg={true} authPage={true} />
		</div>
	);
}

Register.propTypes = {
	type: PropTypes.string.isRequired,
};

export default Register;
