import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import Badges from '../components/Badges';
import Alert from './Alert';
import isEmpty from '../components/isEmpty';

import { addLoggedUser } from '../redux/actions/AuthActions';

const mapDispatchToProps = (dispatch) => {
	return { addLoggedUser: (user) => dispatch(addLoggedUser(user)) };
};

const mapStateToProps = (state) => {
	return { loggedUser: state.AuthReducer.loggedUser };
};

function ConnectedSidebar({ loggedUser }) {
	const API_URL = process.env.REACT_APP_API_URL;

	const handleLogout = () => {
		axios
			.get(`${API_URL}/api/logout`, { withCredentials: true })
			.then(() => {
				addLoggedUser({});
				setAlert({
					type: 'success',
					text: "You've been logged out.",
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
		<>
			{!isEmpty(loggedUser) && (
				<div className="Sidebar">
					<Alert type={alert.type} text={alert.text} />
					<div
						style={{ background: loggedUser.avatar }}
						className="Sidebar__avatar"
					/>

					<h3 className="Sidebar__userName">
						{loggedUser.full_name.first_name +
							' ' +
							loggedUser.full_name.last_name}
					</h3>

					<p className="Sidebar__userType">
						<FontAwesomeIcon
							icon={loggedUser.type === 'candidate' ? faBriefcase : faChartPie}
						/>{' '}
						Candidate
					</p>
					<div className="Sidebar__badges">
						<Badges />
					</div>
					<div className="Sidebar__links">
						<div>
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
						</div>
						<Link
							to="#"
							className="Sidebar__links--link"
							onClick={handleLogout}
						>
							Logout
						</Link>
					</div>
				</div>
			)}
		</>
	);
}

ConnectedSidebar.propTypes = {
	loggedUser: PropTypes.object.isRequired,
};

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(ConnectedSidebar);
export default Sidebar;
