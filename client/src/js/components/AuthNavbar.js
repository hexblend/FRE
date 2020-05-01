import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

function AuthNavbar({ bg, authPage }) {
	const PUBLIC_URL = process.env.PUBLIC_URL;

	let userType;
	let userAction;
	if (authPage) {
		const url = window.location.pathname;
		const urlArray = url.split('/');
		userType = urlArray[1];
		userAction = urlArray[2];
	}
	return (
		<div className={`authNavbar ${!bg && 'noBG'}`}>
			{!authPage && (
				<>
					<p className="authNavbar__description small">Not a memeber yet?</p>
					<div className="authNavbar__rightLinks">
						<NavLink
							to={`${PUBLIC_URL}/candidate/register`}
							className="authNavbar__rightLinks--link"
						>
							Create a Candidate Profile
						</NavLink>
						<NavLink
							to={`${PUBLIC_URL}/employer/register`}
							className="authNavbar__rightLinks--link"
						>
							Create a Employer Profile
						</NavLink>
					</div>
				</>
			)}
			{authPage && (
				<div className="authNavbar__middleLinks">
					<NavLink
						to={`hello`}
						className={`authNavbar__middleLinks--link 
								   ${userType === 'candidate' && 'active'}`}
					>
						<FontAwesomeIcon icon={faChartPie} className="icon" />
						Candidate
					</NavLink>

					<NavLink
						to={`hello`}
						className={`authNavbar__middleLinks--link 
								    ${userType === 'employer' && 'active'}`}
					>
						<FontAwesomeIcon icon={faBriefcase} className="icon" />
						Employer
					</NavLink>
				</div>
			)}
		</div>
	);
}

AuthNavbar.propTypes = {
	bg: PropTypes.bool,
	authPage: PropTypes.bool,
};

export default AuthNavbar;
