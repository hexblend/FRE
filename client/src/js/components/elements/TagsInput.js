import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {
	addSearchTag,
	removeSearchTag,
} from '../../redux/actions/SearchActions';

const mapStateToProps = (state) => ({ tags: state.SearchReducer.searchTags });

const mapDispatchToProps = (dispatch) => {
	return {
		addSearchTag: (tag) => dispatch(addSearchTag(tag)),
		removeSearchTag: (tag) => dispatch(removeSearchTag(tag)),
	};
};

// Have a search reducer for all the search state (including suggestions)

function ConnectedTagsInput({
	id,
	minWidth,
	placeholder,
	label,
	whiteLabel,
	noBG,
	noShadow,
	error,
	// Globals
	tags,
	addSearchTag,
	removeSearchTag,
}) {
	const [tagsLeft, setTagsLeft] = useState(3); // global
	const [typing, setTyping] = useState('');
	const [typingTimeout, setTypingTimeout] = useState(0); // global
	const [suggestions, setSuggestions] = useState([]);
	const [tagsWidth, setTagsWidth] = useState('');
	const [internalError, setInternalError] = useState(''); // global errors for each field

	const addSuggestedTag = (tagName) => {
		if (tags.indexOf(tagName) !== -1) {
			setSuggestions([]);
			return setInternalError('You already added this tag');
		}
		addSearchTag(tagName);
		setTagsLeft(tagsLeft - 1);
		setTyping('');
		setSuggestions([]);
	};

	const removeTag = (index) => {
		removeSearchTag(index);
		setTagsLeft((tagsLeft) => tagsLeft + 1);
		setInternalError('');
		error = '';
	};

	const searchJobs = (e) => {
		setTyping(e.target.value);
		if (typingTimeout) clearTimeout(typingTimeout);
		setTypingTimeout(
			setTimeout(() => {
				axios
					.get(
						`http://api.dataatwork.org/v1/jobs/autocomplete?contains=${typing}`
					)
					.then((res) => setSuggestions(res.data.slice(0, 4).reverse()));
			}, 150)
		);
	};

	const refCallback = (element) => {
		if (element) {
			setTagsWidth(element.getBoundingClientRect().width + 16 + 'px');
		}
	};
	return (
		<div className="TagsInput">
			{/* Label */}
			<label
				htmlFor={id}
				className={`customLabel ${whiteLabel && 'whiteLabel'}`}
			>
				{label}
			</label>
			{/* Tags */}
			<ul className="Tags" ref={refCallback}>
				{tags.map((tag, index) => (
					<li className="tag" key={index}>
						<span className="tag__text">{tag}</span>
						<span className="tag__icon" onClick={() => removeTag(index)}>
							<FontAwesomeIcon icon={faTimes} />
						</span>
					</li>
				))}
			</ul>
			{/* Input */}
			<input
				type="text"
				id={id}
				name={id}
				autoComplete="off"
				placeholder={tags.length > 0 ? '' : placeholder}
				className={`customInput ${noBG && 'noBG'} ${noShadow && 'noShadow'}`}
				style={{
					minWidth: `${tagsWidth + minWidth}`,
					paddingLeft: `${tagsWidth}`,
					width: `${tags.length > 0 && 0}`,
				}}
				value={typing}
				onChange={(e) => searchJobs(e)}
				readOnly={tagsLeft === 0 ? true : false}
			/>
			{/* Errors / Info Messages */}
			<p className="customInput__error">{internalError || error}</p>
			{!error && (
				<p
					className="customInput__info"
					style={{
						color: `${tagsLeft === 0 ? '#b91515' : 'white'}`,
						fontWeight: `${tagsLeft === 0 ? 400 : 300}`,
					}}
				>
					{tagsLeft} job titles left
				</p>
			)}
			{/* Suggestions */}
			<ul className="Suggestions">
				{suggestions.map((suggestion) => (
					<li
						key={suggestion.uuid}
						onClick={() => addSuggestedTag(suggestion.suggestion)}
						className="Suggestions__suggestion"
					>
						{suggestion.suggestion}
					</li>
				))}
			</ul>
		</div>
	);
}

ConnectedTagsInput.propTypes = {
	minWidth: PropTypes.string,
	placeholder: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	whiteLabel: PropTypes.bool,
	noBG: PropTypes.bool,
	noShadow: PropTypes.bool,
};

const TagsInput = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedTagsInput);
export default TagsInput;
