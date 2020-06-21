import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartPie,
	faBriefcase,
	faArrowLeft,
	faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

function AuthNavbar({ bg, authPage }) {
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	let userType;
	let userAction;
	if (authPage) {
		const url = window.location.pathname;
		const urlArray = url.split('/');
		userType = urlArray[1]; // "employer" || "candidate"
		userAction = urlArray[2]; // "register" || "login"
	}

	const history = useHistory();

	const [activeNav, setActiveNav] = useState(false);

	return (
		<div
			className={`authNavbar ${!bg && 'noBG'} ${
				activeNav && 'active'
			}`}
		>
			{!authPage && (
				<>
					<p className="authNavbar__description small">
						Not a memeber yet?
					</p>
					<button
						onClick={() => setActiveNav(!activeNav)}
						className="authNavbar__dropdownButton"
					>
						<FontAwesomeIcon icon={faAngleDown} />
					</button>
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
				<>
					<div
						className="authNavbar__goBackLink"
						onClick={history.goBack}
					>
						<FontAwesomeIcon icon={faArrowLeft} /> Go Back
					</div>

					<div className="authNavbar__middleLinks">
						<NavLink
							to={`${PUBLIC_URL}/candidate/${userAction}`}
							className={`authNavbar__middleLinks--link 
								   ${userType === 'candidate' && 'active'}`}
						>
							<FontAwesomeIcon
								icon={faBriefcase}
								className="icon"
							/>
							Candidate
						</NavLink>

						<NavLink
							to={`${PUBLIC_URL}/employer/${userAction}`}
							className={`authNavbar__middleLinks--link 
								    ${userType === 'employer' && 'active'}`}
						>
							<FontAwesomeIcon
								icon={faChartPie}
								className="icon"
							/>
							Employer
						</NavLink>
					</div>
				</>
			)}
		</div>
	);
}

AuthNavbar.propTypes = {
	bg: PropTypes.bool,
	authPage: PropTypes.bool,
};

export default AuthNavbar;
