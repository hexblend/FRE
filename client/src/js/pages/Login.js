import React from 'react';
import PropTypes from 'prop-types';
import AuthNavbar from '../components/AuthNavbar';

function Login({ type }) {
	return (
		<div>
			<AuthNavbar bg={true} authPage={true} />
		</div>
	);
}

Login.propTypes = {
	type: PropTypes.string,
};

export default Login;
