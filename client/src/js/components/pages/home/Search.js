import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../elements/Button';
import TagsInput from '../../elements/TagsInput';
import LocationInput from '../../elements/LocationInput';

const mapStateToProps = (state) => ({
	tags: state.SearchReducer.searchTags,
	location: state.SearchReducer.searchLocation,
});

function ConnectedSearch({ tags, location }) {
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
	const [jobTitlesError, setJobTitlesError] = useState('');
	const [locationError, setLocationError] = useState('');

	const handleSubmit = (e) => {
		if (tags.length === 0 || location === '') {
			e.preventDefault();
			if (tags.length === 0) setJobTitlesError('You must enter a job title');
			if (location === '') setLocationError('You must enter a job title');
		} else {
			console.log('submitted search');
		}
		// Set errors to be globals for each of the fields
		// If they are empty show error
		// Name this search bar	and moove out of this folder
	};
	const job1 = tags[0];
	const job2 = tags[1];
	const job3 = tags[2];
	return (
		<div className="homeHeader__search">
			<TagsInput
				id="jobTitle"
				placeholder="Developer, Designer"
				label="I'm looking for:"
				whiteLabel={true}
				minWidth="350px"
				error={jobTitlesError}
			/>
			<LocationInput
				id="location"
				placeholder="London"
				label="In:"
				whiteLabel={true}
				width="210px"
				error={locationError}
			/>
			<Link
				to={`${PUBLIC_URL}/search?job1=${job1}
										 ${job2 !== undefined && `&job2=${job2}`}
										 ${job3 !== undefined && `&job3=${job3}`}
										 &location=${location}
				   `}
				onClick={handleSubmit}
			>
				<Button text="Search for candidates" />
			</Link>
		</div>
	);
}

const Search = connect(mapStateToProps)(ConnectedSearch);
export default Search;
