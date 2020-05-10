import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../elements/Button';
import TagsInput from '../../elements/TagsInput';
import LocationInput from '../../elements/LocationInput';

function Search() {
	// const [jobTitle, setJobTitle] = useState('');
	// const [jobTitleError, setJobTitleError] = useState('');

	// const [location, setLocation] = useState('');
	// const [locationError, setLocationError] = useState('');

	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	const handleSubmit = (e) => {
		// if (jobTitle === '' || location === '') e.preventDefault();
		// setJobTitleError(jobTitle === '' ? 'You must add a job title' : '');
		// setLocationError(location === '' ? 'You must add a location' : '');
		console.log('submitted search');

		// Get the tags and location from global state
		// If they are empty show error
		// Pass error through props
	};

	return (
		<div className="homeHeader__search">
			<TagsInput
				id="jobTitle"
				placeholder="Developer, Designer"
				label="I'm looking for:"
				whiteLabel={true}
				minWidth="350px"
				// error
			/>
			<LocationInput
				id="location"
				placeholder="London"
				label="In:"
				whiteLabel={true}
				width="210px"
				// error
			/>
			<Link to={`${PUBLIC_URL}/search`} onClick={handleSubmit}>
				<Button text="Search for candidates" />
			</Link>
		</div>
	);
}

export default Search;
