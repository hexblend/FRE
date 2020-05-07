import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import Badges from '../components/Badges';

function Sidebar({ loggedUser }) {
	return (
		<div className="Sidebar">
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
		</div>
	);
}

Sidebar.propTypes = {
	loggedUser: PropTypes.object.isRequired,
};

export default Sidebar;
