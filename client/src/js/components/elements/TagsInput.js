import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {
	updateTagsInput,
	addSearchTag,
	removeSearchTag,
	updateTagsInputError,
	updateTagsInputSuggestions,
	updateLocationInputSuggestions,
} from '../../redux/actions/SearchActions';

const mapStateToProps = (state) => ({
	tagsInput: state.SearchReducer.tagsInput,
	tags: state.SearchReducer.searchTags,
	tagsLeft: state.SearchReducer.tagsLeft,
	tagsInputError: state.SearchReducer.tagsInputError,
	tagsInputSuggestions: state.SearchReducer.tagsInputSuggestions,
});

const mapDispatchToProps = (dispatch) => {
	return {
		updateTagsInput: (value) => dispatch(updateTagsInput(value)),
		addSearchTag: (tag) => dispatch(addSearchTag(tag)),
		removeSearchTag: (tag) => dispatch(removeSearchTag(tag)),
		updateTagsInputError: (error) => dispatch(updateTagsInputError(error)),
		updateTagsInputSuggestions: (suggestions) =>
			dispatch(updateTagsInputSuggestions(suggestions)),
		updateLocationInputSuggestions: (suggestions) =>
			dispatch(updateLocationInputSuggestions(suggestions)),
	};
};

function ConnectedTagsInput({
	id,
	minWidth,
	placeholder,
	label,
	whiteLabel,
	noBG,
	noShadow,
	// Globals
	tagsInput,
	updateTagsInput,
	tags,
	tagsLeft,
	addSearchTag,
	removeSearchTag,
	tagsInputError,
	updateTagsInputError,
	tagsInputSuggestions,
	updateTagsInputSuggestions,
	updateLocationInputSuggestions,
}) {
	const [typingTimeout, setTypingTimeout] = useState(0);
	const [tagsWidth, setTagsWidth] = useState('');

	const addSuggestedTag = (tagName) => {
		if (tags.indexOf(tagName) !== -1) {
			updateTagsInputSuggestions([]);
			return updateTagsInputError('Tag already added');
		}
		addSearchTag(tagName);
		updateTagsInput('');
		updateTagsInputError('');
		updateTagsInputSuggestions([]);
	};

	const removeTag = (index) => {
		removeSearchTag(index);
		updateTagsInputError('');
	};

	const searchJobs = (e) => {
		updateTagsInput(e.target.value);
		if (typingTimeout) clearTimeout(typingTimeout);
		setTypingTimeout(
			setTimeout(() => {
				axios
					.get(
						`http://api.dataatwork.org/v1/jobs/autocomplete?contains=${tagsInput}`
					)
					.then((res) =>
						updateTagsInputSuggestions(res.data.slice(0, 4).reverse())
					);
			}, 500)
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
			<ul
				className="Tags"
				ref={refCallback}
				style={{ top: `${!label && '1.7rem'}` }}
			>
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
					background: `${!whiteLabel && '#f9f9f9'}`,
				}}
				value={tagsInput}
				onChange={(e) => searchJobs(e)}
				onFocus={() => updateLocationInputSuggestions([])}
				readOnly={tagsLeft === 0 ? true : false}
			/>
			{/* Errors / Info Messages */}
			{tagsInputError ? (
				<p className="customInput__error">{tagsInputError}</p>
			) : (
				<p
					className="customInput__info"
					style={{
						fontWeight: `${tagsLeft === 0 ? 400 : 300}`,
						color: `${whiteLabel ? 'white' : 'black'}`,
						bottom: `${!label && '-2rem'}`,
					}}
				>
					{tagsLeft} job titles left
				</p>
			)}
			{/* Suggestions */}
			<ul className="Suggestions" style={{ top: `${!label && '5.85rem'}` }}>
				{tagsInputSuggestions.map((suggestion) => (
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
