import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	updateSearchLocation,
	updateLocationInputError,
} from '../../redux/actions/SearchActions.js';

const mapDispatchToProps = (dispatch) => ({
	setSearchLocation: (location) => dispatch(updateSearchLocation(location)),
	updateLocationInputError: (error) =>
		dispatch(updateLocationInputError(error)),
});

const mapStateToProps = (state) => ({
	searchLocation: state.SearchReducer.searchLocation,
	locationInputError: state.SearchReducer.locationInputError,
});

function ConnectedLocationInput({
	id,
	placeholder,
	label,
	whiteLabel,
	noBG,
	noShadow,
	width,
	// Globals
	searchLocation,
	setSearchLocation,
	locationInputError,
	updateLocationInputError,
}) {
	const [typingTimeout, setTypingTimeout] = useState(0); // global
	const [suggestions, setSuggestions] = useState([]);

	const handleChange = (e) => {
		setSearchLocation(e.target.value);
		if (typingTimeout) clearTimeout(typingTimeout);
		setTypingTimeout(
			setTimeout(() => {
				axios
					.get(`https://api.postcodes.io/places?q=${searchLocation}`)
					.then((res) => setSuggestions(res.data.result.slice(0, 4)));
			}, 200)
		);
	};

	const handleClick = (location) => {
		setSearchLocation(location);
		setSuggestions([]);
		updateLocationInputError('');
	};

	return (
		<div className="LocationInput">
			{/* Label */}
			<label
				htmlFor={id}
				className={`customLabel ${whiteLabel && 'whiteLabel'}`}
			>
				{label}
			</label>
			{/* Input */}
			<input
				type="text"
				id={id}
				name={id}
				autoComplete="off"
				placeholder={placeholder}
				className={`customInput ${noBG && 'noBG'} ${noShadow && 'noShadow'}`}
				value={searchLocation}
				style={{ minWidth: `${width}` }}
				onChange={(e) => handleChange(e)}
			/>
			{/* Errors */}
			<p className="customInput__error">{locationInputError}</p>
			{/* Suggestions */}
			<ul className="Suggestions" style={{ width: `${width}` }}>
				{suggestions.map((suggestion) => (
					<li
						key={suggestion.code}
						onClick={() => handleClick(suggestion.name_1)}
						className="Suggestions__suggestion"
					>
						{suggestion.name_1}
					</li>
				))}
			</ul>
		</div>
	);
}

ConnectedLocationInput.propTypes = {
	placeholder: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	whiteLabel: PropTypes.bool,
	noBG: PropTypes.bool,
	noShadow: PropTypes.bool,
	width: PropTypes.string,
};

const LocationInput = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedLocationInput);
export default LocationInput;
