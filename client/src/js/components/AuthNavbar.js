import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function AuthNavbar({ bg }) {
	return (
		<div className={`authNavbar ${!bg && 'noBG'}`}>
			<p className="authNavbar__description small">Not a memeber yet?</p>
			<div className="authNavbar__rightLinks">
				<NavLink
					to="/candidate/register"
					className="authNavbar__rightLinks--link"
				>
					Create a Candidate Profile
				</NavLink>
				<NavLink
					to="/employer/register"
					className="authNavbar__rightLinks--link"
				>
					Create a Employer Profile
				</NavLink>
			</div>
		</div>
	);
}

AuthNavbar.propTypes = {
	bg: PropTypes.bool,
};

export default AuthNavbar;
