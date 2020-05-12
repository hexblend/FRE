import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../components/Logo';
import Button from '../components/elements/Button';
import CustomLink from '../components/elements/Link';
import TagsInput from '../components/elements/TagsInput';
import LocationInput from '../components/elements/LocationInput';
import isEmpty from '../components/isEmpty';

import {
	updateTagsInputError,
	updateLocationInputError,
	updateSearchResults,
	updateTagsInputSuggestions,
	updateLocationInputSuggestions,
} from '../redux/actions/SearchActions';

const mapStateToProps = (state) => ({
	searchResults: state.SearchReducer.searchResults,
	tags: state.SearchReducer.searchTags,
	location: state.SearchReducer.searchLocation,
	tagsLeft: state.SearchReducer.tagsLeft,
	loggedUser: state.AuthReducer.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
	updateSearchResults: (results) => dispatch(updateSearchResults(results)),
	updateTagsInputError: (error) => dispatch(updateTagsInputError(error)),
	updateLocationInputError: (error) =>
		dispatch(updateLocationInputError(error)),
	updateTagsInputSuggestions: (suggestions) =>
		dispatch(updateTagsInputSuggestions(suggestions)),
	updateLocationInputSuggestions: (suggestions) =>
		dispatch(updateLocationInputSuggestions(suggestions)),
});

function ConnectedHeader({
	// Globals
	tags,
	tagsLeft,
	updateTagsInputError,
	location,
	updateLocationInputError,
	searchResults,
	updateSearchResults,
	loggedUser,
	updateTagsInputSuggestions,
	updateLocationInputSuggestions,
}) {
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	const [view, setView] = useState('results');

	const handleSubmit = (e) => {
		if (tagsLeft === 3 || location === '') {
			e.preventDefault();
			updateTagsInputSuggestions([]);
			updateLocationInputSuggestions([]);
			if (tagsLeft === 3) updateTagsInputError('Please enter a job title');
			if (location === '') updateLocationInputError('Please enter a location');
		} else if (location !== '' && location[0] !== location[0].toUpperCase()) {
			e.preventDefault();
			updateTagsInputSuggestions([]);
			updateLocationInputSuggestions([]);
			updateLocationInputError('Select a location from the list');
		} else {
			updateSearchResults([]);
		}
	};

	const generateLink = () => {
		let link = `${PUBLIC_URL}/search?`;
		switch (tagsLeft) {
			case 2:
				link += `job1=${tags[0]}&location=${location}`;
				break;
			case 1:
				link += `job1=${tags[0]}&job2=${tags[1]}&location=${location}`;
				break;
			case 0:
				link += `job1=${tags[0]}&job2=${tags[1]}&job3=${tags[2]}&location=${location}`;
				break;
			default:
				link += '';
		}
		return link;
	};

	return (
		<div className="Header">
			<div className="Header__search">
				<Logo size="small" />
				{view === 'results' && (
					<div className="Header__search--content resultsView">
						<p>
							{searchResults.length}{' '}
							{searchResults.length === 1 ? 'Result' : 'Results'} for "
							{tags.join(', ')}" in {location}
						</p>
						<div className="Header__search--buttons">
							{isEmpty(loggedUser) && (
								<CustomLink
									to={`${PUBLIC_URL}/candidate/login`}
									type="gray"
									text="Login"
								/>
							)}
							<Button text="Change Search" onClick={() => setView('search')} />
						</div>
					</div>
				)}
				{view === 'search' && (
					<div className="Header__search--content searchView">
						<div className="Header__search--form">
							<div className="formGroup">
								<p>I'm looking for: </p>
								<TagsInput
									id="jobTitle"
									placeholder="Developer, Designer"
									minWidth="350px"
								/>
							</div>
							<div className="formGroup">
								<p>In: </p>
								<LocationInput
									id="location"
									placeholder="London"
									width="210px"
								/>
							</div>
						</div>
						<div className="Header__search--buttons">
							<CustomLink
								to="#"
								type="gray"
								text="Go Back"
								onClick={() => setView('results')}
							/>
							<Link to={generateLink} onClick={handleSubmit}>
								<Button text="Search for candidates" />
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

const Header = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader);
export default Header;
