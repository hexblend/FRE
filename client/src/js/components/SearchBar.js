import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from './elements/Button';
import TagsInput from './elements/TagsInput';
import LocationInput from './elements/LocationInput';

import {
	updateTagsInputError,
	updateLocationInputError,
} from '../redux/actions/SearchActions';

const mapStateToProps = (state) => ({
	tags: state.SearchReducer.searchTags,
	tagsLeft: state.SearchReducer.tagsLeft,
	location: state.SearchReducer.searchLocation,
});

const mapDispatchToProps = (dispatch) => ({
	updateTagsInputError: (error) => dispatch(updateTagsInputError(error)),
	updateLocationInputError: (error) =>
		dispatch(updateLocationInputError(error)),
});

function ConnectedSearchBar({
	// Globals
	tags,
	tagsLeft,
	updateTagsInputError,
	location,
	updateLocationInputError,
}) {
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	const handleSubmit = (e) => {
		if (tagsLeft === 3 || LocationInput === '') {
			e.preventDefault();
			if (tagsLeft === 3) updateTagsInputError('Please enter a job title');
			if (location === '') updateLocationInputError('Please enter a location');
		} else {
			console.log('submitted search');
		}
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
			/>
			<LocationInput
				id="location"
				placeholder="London"
				label="In:"
				whiteLabel={true}
				width="210px"
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

const SearchBar = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedSearchBar);
export default SearchBar;
