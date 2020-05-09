import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import TagsInput from '../../elements/TagsInput';

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

		// Get job titles
		const job_titles = jobTitle.split(',');
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
			{/* <Input
				type="text"
				id="jobTitle"
				placeholder="Web developer, Graphic Designer"
				label="I'm looking for:"
				minWidth="350px"
				whiteLabel={true}
				value={jobTitle}
				handleChange={setJobTitle}
				error={jobTitleError}
			/> */}
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
