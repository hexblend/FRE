import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../components/Logo';
import Button from '../components/elements/Button';
import CustomLink from '../components/elements/Link';

import TagsInput from '../components/elements/TagsInput';
import LocationInput from '../components/elements/LocationInput';

const mapStateToProps = (state) => ({
	searchResults: state.SearchReducer.searchResults,
	searchTags: state.SearchReducer.searchTags,
	searchLocation: state.SearchReducer.searchLocation,
});

function ConnectedHeader({ searchResults, searchTags, searchLocation }) {
	const [view, setView] = useState('results');
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	const handleSubmit = (e) => {
		console.log('submitted');
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
							{searchTags.join(', ')}" in {searchLocation}
						</p>
						<div className="Header__serach--buttons">
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
							</div>
						</div>
						<div className="Header__search--buttons">
							<CustomLink
								to="#"
								type="gray"
								text="Go Back"
								onClick={() => setView('results')}
							/>
							<Link to={`${PUBLIC_URL}/search`} onClick={handleSubmit}>
								<Button text="Search for candidates" />
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

const Header = connect(mapStateToProps)(ConnectedHeader);
export default Header;
