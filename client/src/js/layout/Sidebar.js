import React, { useState, useEffect } from 'react';
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
import { getMessages } from '../redux/actions/MessagesActions';

const mapDispatchToProps = (dispatch) => ({
	addLoggedUser: (user) => dispatch(addLoggedUser(user)),
	getMessages: (obj) => dispatch(getMessages(obj)),
});

const mapStateToProps = (state) => {
	return { loggedUser: state.AuthReducer.loggedUser };
};

function ConnectedSidebar({ loggedUser, view, getMessages }) {
	const API_URL = process.env.REACT_APP_API_URL;
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	// Profiles Convs IDS
	const [IDs, setIDs] = useState([]);
	const [convProfiles, setConvProfiles] = useState([]);
	useEffect(() => {
		if (!isEmpty(loggedUser)) {
			loggedUser.sent_messages.forEach((message) => {
				if (IDs.indexOf(message.to) === -1) {
					setIDs([...IDs, message.to]);
				}
			});
			loggedUser.received_messages.forEach((message) => {
				if (IDs.indexOf(message.from) === -1) {
					setIDs([...IDs, message.from]);
				}
			});
		}
	}, [loggedUser, IDs, setIDs, convProfiles, setConvProfiles]);
	useEffect(() => {
		IDs.forEach((id) => {
			axios.get(`${API_URL}/api/users/${id}`, { useCredentials: true }).then((res) => {
				setConvProfiles([...convProfiles, res.data.user]);
			});
		});
	}, [IDs]);

	const showConversation = (to) => {
		const from = loggedUser._id;
		axios
			.get(`${API_URL}/api/users/view_conversation/${to}/${from}`, {
				useCredentials: true,
			})
			.then((res) => getMessages(res.data.conversation));
	};

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
			{!isEmpty(loggedUser) && view === 'default' && (
				<div className="Sidebar">
					<Alert type={alert.type} text={alert.text} />
					<div
						style={{ backgroundImage: `url(${loggedUser.avatar})` }}
						className="Sidebar__avatar"
					/>

					<h3 className="Sidebar__userName">
						{loggedUser.type === 'candidate'
							? loggedUser.full_name
							: loggedUser.company.name}
					</h3>

					<p className="Sidebar__userType">
						<FontAwesomeIcon
							icon={loggedUser.type === 'candidate' ? faBriefcase : faChartPie}
						/>{' '}
						{loggedUser.type}
					</p>
					<div className="Sidebar__badges">
						<Badges profile={loggedUser} />
					</div>
					<div className="Sidebar__links">
						<div>
							<Link to={`/profile/${loggedUser._id}`} className="Sidebar__links--link">
								View your profile
							</Link>
							<Link
								to={`/profile/${loggedUser._id}/messages`}
								className="Sidebar__links--link"
							>
								Check your messages
							</Link>
							<Link to={`${PUBLIC_URL}`} className="Sidebar__links--link">
								Search
							</Link>
						</div>
						<Link to="#" className="Sidebar__links--link" onClick={handleLogout}>
							Logout
						</Link>
					</div>
				</div>
			)}
			{!isEmpty(loggedUser) && view === 'messages' && (
				<div className="Sidebar">
					<Alert type={alert.type} text={alert.text} />
					{convProfiles.map((profile) => (
						<div
							className="MessageProfile"
							key={profile._id}
							onClick={() => showConversation(profile._id)}
						>
							{/* Avatar */}
							<div
								className="MessageProfile__avatar"
								style={{ backgroundImage: `url(${profile.avatar})` }}
							></div>
							<div className="MessageProfile__rightSide">
								{/* Type */}
								{profile.type === 'candidate' && (
									<FontAwesomeIcon icon={faBriefcase} className="MessageProfile__type" />
								)}
								{profile.type === 'employer' && (
									<FontAwesomeIcon icon={faChartPie} className="MessageProfile__type" />
								)}
								{/* Name */}
								{profile.company.name ? (
									<p className="MessageProfile__name">{profile.company.name}</p>
								) : (
									<p className="MessageProfile__name">
										{profile.full_name.first_name + ' ' + profile.full_name.last_name}
									</p>
								)}
							</div>
						</div>
					))}
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
