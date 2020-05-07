import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkerAlt,
	faSuitcase,
	faGlobe,
	faCalendarAlt,
	faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';

function SearchResult({ loggedIn, profile }) {
	const fullNameArray = profile.name.split(' ');
	const hiddenFullName = `${fullNameArray[0]} ${fullNameArray[1].slice(0, 1)}.`;
	return (
		<Link to={`/${profile.type}/${profile.id}`}>
			<div className={`SearchResult ${!loggedIn && 'marginLeft'}`}>
				<h3 className="SearchResult__name">
					{loggedIn ? profile.name : hiddenFullName}
				</h3>
				<div className="SearchResult__icons">
					<div>
						{profile.jobTitle && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faSuitcase} />
								<span>{profile.jobTitle}</span>
							</div>
						)}
						{profile.city && loggedIn && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faMapMarkerAlt} />
								<span>{profile.city}</span>
							</div>
						)}

						{profile.remoteWorker && loggedIn && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faGlobe} />
								<span>Remote Worker</span>
							</div>
						)}
					</div>
					<div>
						{profile.yearsOfExperience && loggedIn && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faCalendarAlt} />
								<span>
									Years of activity:{' '}
									{`${profile.yearsOfExperience} - ${
										profile.yearsOfExperience + 1
									}`}
								</span>
							</div>
						)}
						{profile.higherEducation && loggedIn && (
							<div className="SearchResult__icons--iconRow">
								<FontAwesomeIcon icon={faGraduationCap} />
								<span>Higher Education: Yes</span>
							</div>
						)}
					</div>
				</div>
				<div className={`SearchResult__description ${!loggedIn && 'h'}`}>
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

SearchResult.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	profile: PropTypes.object.isRequired,
};

export default SearchResult;
