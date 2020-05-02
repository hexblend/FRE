import React from 'react';
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
	return (
		<div className="SearchResult">
			<h3 className="SearchResult__name">{profile.name}</h3>
			<div className="SearchResult__icons">
				{profile.jobTitle && (
					<div className="searchResult__icons--iconRow">
						<FontAwesomeIcon icon={faSuitcase} />
						<span>{profile.jobTitle}</span>
					</div>
				)}
				{profile.city && (
					<div className="searchResult__icons--iconRow">
						<FontAwesomeIcon icon={faMapMarkerAlt} />
						<span>{profile.city}</span>
					</div>
				)}

				{profile.remoteWorker && (
					<div className="searchResult__icons--iconRow">
						<FontAwesomeIcon icon={faGlobe} />
						<span>Remote Worker</span>
					</div>
				)}
				{profile.yearsOfExperience && (
					<div className="searchResult__icons--iconRow">
						<FontAwesomeIcon icon={faCalendarAlt} />
						<span>
							Years of activity:{' '}
							{`${profile.yearsOfExperience} - ${
								profile.yearsOfExperience + 1
							}`}
						</span>
					</div>
				)}
				{profile.higherEducation && (
					<div className="searchResult__icons--iconRow">
						<FontAwesomeIcon icon={faGraduationCap} />
						<span>Higher Education: Yes</span>
					</div>
				)}
			</div>
			<div className="SearchResult__description">
				<h4>Description:</h4>
				<p>
					{profile.description.length > 400
						? `${profile.description.slice(0, 400)}...`
						: profile.description}
				</p>
			</div>
		</div>
	);
}

SearchResult.propTypes = {
	login: PropTypes.bool.isRequired,
	profile: PropTypes.object.isRequired,
};

export default SearchResult;
