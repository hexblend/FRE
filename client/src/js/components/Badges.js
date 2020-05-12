import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSuitcase,
	faMapMarkerAlt,
	faGlobe,
	faCalendarAlt,
	faChartPie,
	faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';

function Badges({ profile }) {
	return (
		<div className="Badges">
			{profile.type === 'candidate' && (
				<>
					{profile.job_title && (
						<div className="Badges__badgeRow">
							<FontAwesomeIcon icon={faSuitcase} />
							<span>{profile.job_title}</span>
						</div>
					)}
					{profile.city && (
						<div className="Badges__badgeRow">
							<FontAwesomeIcon icon={faMapMarkerAlt} />
							<span>{profile.city}</span>
						</div>
					)}
					{profile.remote_worker && (
						<div className="Badges__badgeRow">
							<FontAwesomeIcon icon={faGlobe} />
							<span>Remote Worker</span>
						</div>
					)}
					{profile.years_of_activity && (
						<div className="Badges__badgeRow">
							<FontAwesomeIcon icon={faCalendarAlt} />
							<span>
								Years of activity:{' '}
								{`${profile.years_of_activity} - ${
									profile.years_of_activity + 1
								}`}
							</span>
						</div>
					)}
					{profile.higher_education && (
						<div className="Badges__badgeRow">
							<FontAwesomeIcon icon={faGraduationCap} />
							<span>Higher Education: Yes</span>
						</div>
					)}
				</>
			)}
			{profile.type === 'employer' && (
				<>
					{profile.company.type && (
						<div className="Badges__badgeRow">
							<FontAwesomeIcon icon={faChartPie} />
							<span>{profile.company.type}</span>
						</div>
					)}
					{profile.city && (
						<div className="Badges__badgeRow">
							<FontAwesomeIcon icon={faMapMarkerAlt} />
							<span>{profile.city}</span>
						</div>
					)}
					{profile.years_of_activity && (
						<div className="Badges__badgeRow">
							<FontAwesomeIcon icon={faCalendarAlt} />
							<span>
								Years of activity:{' '}
								{`${profile.years_of_activity} - ${
									profile.years_of_activity + 1
								}`}
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default Badges;
