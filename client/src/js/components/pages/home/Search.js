import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import TagsInput from '../../elements/TagsInput';
import LocationInput from '../../elements/LocationInput';

function Search() {
	const [jobTitle, setJobTitle] = useState('');
	const [jobTitleError, setJobTitleError] = useState('');

	const [location, setLocation] = useState('');
	const [locationError, setLocationError] = useState('');

	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	const handleSubmit = (e) => {
		if (jobTitle === '' || location === '') e.preventDefault();
		// Check empty
		setJobTitleError(jobTitle === '' ? 'You must add a job title' : '');
		setLocationError(location === '' ? 'You must add a location' : '');
	};

	return (
		<div className="homeHeader__search">
			<TagsInput
				id="jobTitle"
				placeholder="Developer, Designer"
				label="I'm looking for:"
				whiteLabel={true}
				minWidth="350px"
			/>
			<LocationInput
				id="location"
				placeholder="London"
				label="In:"
				whiteLabel={true}
				width="210px"
			/>
			<Link to={`${PUBLIC_URL}/search`} onClick={handleSubmit}>
				<Button text="Search for candidates" />
			</Link>
		</div>
	);
}

export default Search;
