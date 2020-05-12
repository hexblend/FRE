import React from 'react';
import isEmpty from './isEmpty';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export const ConnectedInfoBar = ({ loggedUser, searchResults }) => {
	return (
		<>
			{searchResults.length === 0 && (
				<div className="InfoBar">
					<div className="InfoBar__left">
						<FontAwesomeIcon icon={faInfoCircle} />
						<span className="InfoBar__text">
							We're sorry for the inconvenience.
						</span>
					</div>
				</div>
			)}
			{searchResults.length !== 0 && isEmpty(loggedUser) && (
				<div className="InfoBar">
					<div className="InfoBar__left">
						<FontAwesomeIcon icon={faInfoCircle} />
						<span className="InfoBar__text">
							You must be logged in to see full information about candidates.
						</span>
					</div>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	searchResults: state.SearchReducer.searchResults,
});

const InfoBar = connect(mapStateToProps)(ConnectedInfoBar);
export default InfoBar;
