import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../elements/Input';
import Button from '../../elements/Button';

function Search() {
	const [jobTitle, setJobTitle] = useState('');
	const [jobTitleError, setJobTitleError] = useState('');

	const [location, setLocation] = useState('');
	const [locationError, setLocationError] = useState('');

	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	const handleSubmit = (e) => {
		if (jobTitle === '' || location === '') e.preventDefault();
		setJobTitleError(jobTitle === '' ? 'You must add a job title' : '');
		setLocationError(location === '' ? 'You must add a location' : '');
	};

	return (
		<div className="homeHeader__search">
			<Input
				type="text"
				id="jobTitle"
				placeholder="Web developer, Graphic Designer"
				label="I'm looking for:"
				minWidth="350px"
				whiteLabel={true}
				value={jobTitle}
				handleChange={setJobTitle}
				error={jobTitleError}
			/>
			<Input
				type="text"
				id="location"
				placeholder="London"
				label="In:"
				whiteLabel={true}
				value={location}
				handleChange={setLocation}
				error={locationError}
			/>
			<Link to={`${PUBLIC_URL}/search`} onClick={handleSubmit}>
				<Button text="Search for candidates" />
			</Link>
		</div>
	);
}

export default Search;
