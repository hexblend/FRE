import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import Badges from '../components/Badges';
import Alert from '../layout/Alert';

function Sidebar({ loggedUser }) {
	const API_URL = process.env.REACT_APP_API_URL;

	const handleLogout = () => {
		axios
			.get(`${API_URL}/api/logout`)
			.then(() => {
				localStorage.removeItem('user');
				setAlert({
					type: 'success',
					text: "You've been logged in",
				});
				setTimeout(() => (window.location.href = '/'), 1700);
			})
			.catch(() => {
				setAlert({
					type: 'error',
					text: 'Something went wrong',
				});
			});
	};

	const [alert, setAlert] = useState({
		type: '',
		text: '',
	});

	return (
		<div className="Sidebar">
			<Alert type={alert.type} text={alert.text} />
			<img
				src={loggedUser.avatar}
				alt="Your avatar"
				className="Sidebar__avatar"
			/>
			<p className="Sidebar__userType">
				<FontAwesomeIcon
					icon={loggedUser.type === 'candidate' ? faBriefcase : faChartPie}
				/>{' '}
				Candidate
			</p>
			<Badges />
			<div className="Sidebar__links">
				<Link
					to={`/profile/${loggedUser._id}`}
					className="Sidebar__links--link"
				>
					View your profile
				</Link>
				<Link
					to={`/profile/${loggedUser._id}/messages`}
					className="Sidebar__links--link"
				>
					Check your messages
				</Link>
				<Link to={`/`} className="Sidebar__links--link">
					Search
				</Link>
				<Link to="#" className="Sidebar__links--link" onClick={handleLogout}>
					Logout
				</Link>
			</div>
		</div>
	);
}

Sidebar.propTypes = {
	loggedUser: PropTypes.object.isRequired,
};

export default Sidebar;
