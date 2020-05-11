import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkerAlt,
	faSuitcase,
	faGlobe,
	faCalendarAlt,
	faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import isEmpty from '../components/isEmpty';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
});

function ConnectedSearchResult({ profile, loggedUser }) {
	const fullName =
		profile.full_name.first_name + ' ' + profile.full_name.last_name;
	const fullNameArray = fullName.split(' ');
	const hiddenFullName = `${fullNameArray[0]} ${fullNameArray[1].slice(0, 1)}.`;
	return (
		<Link to={`/profile/${profile.id}`}>
			<div className={`SearchResult ${isEmpty(loggedUser) && 'marginLeft'}`}>
				<h3 className="SearchResult__name">
					{!isEmpty(loggedUser) ? fullName : hiddenFullName}
				</h3>
				<div className="SearchResult__icons">
					<div>
						{profile.job_title && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faSuitcase} />
								<span>{profile.job_title}</span>
							</div>
						)}
						{profile.city && !isEmpty(loggedUser) && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faMapMarkerAlt} />
								<span>{profile.city}</span>
							</div>
						)}

						{profile.remote_worker && !isEmpty(loggedUser) && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faGlobe} />
								<span>Remote Worker</span>
							</div>
						)}
					</div>
					<div>
						{profile.years_of_activity && !isEmpty(loggedUser) && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faCalendarAlt} />
								<span>
									Years of activity:{' '}
									{`${profile.years_of_activity} - ${
										profile.years_of_activity + 1
									}`}
								</span>
							</div>
						)}
						{profile.higher_education && !isEmpty(loggedUser) && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faGraduationCap} />
								<span>Higher Education: Yes</span>
							</div>
						)}
					</div>
				</div>
				<div
					className={`SearchResult__description ${isEmpty(loggedUser) && 'h'}`}
				>
					<h4>Description:</h4>
					<p>
						{profile.description.length > 500
							? `${profile.description.slice(0, 500)}...`
							: profile.description}
					</p>
				</div>
			</div>
		</Link>
	);
}

ConnectedSearchResult.propTypes = {
	profile: PropTypes.object.isRequired,
};

const SearchResult = connect(mapStateToProps)(ConnectedSearchResult);
export default SearchResult;
