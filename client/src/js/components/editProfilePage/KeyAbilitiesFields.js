import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { updateLoggedField } from '../../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
});

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoggedField: (obj) => dispatch(updateLoggedField(obj)),
	};
};
function KeyAbilitiesFields(props) {
	const { loggedUser, updatedLoggedUser, updateLoggedField } = props;

	const [tagsLeft, setTagsLeft] = useState(0);
	const [tagsInput, setTagsInput] = useState('');

	useEffect(() => {
		if (loggedUser.key_abilities) {
			setTagsLeft(12 - loggedUser.key_abilities.length);
		}
	}, [loggedUser]);

	const addTag = (e) => {
		if (e.key === 'Enter') {
			setTagsInput('');
			if (tagsLeft > 0) {
				updateLoggedField({
					fieldName: 'key_abilities',
					fieldValue: [...loggedUser.key_abilities, e.target.value],
				});
				setTagsLeft(tagsLeft - 1);
			}
		}
	};

	const removeTag = (index) => {
		const tags = loggedUser.key_abilities;
		const remainedTags = tags.filter((tag) => tags.indexOf(tag) !== index);
		updateLoggedField({ fieldName: 'key_abilities', fieldValue: remainedTags });
		setTagsLeft(tagsLeft + 1);
	};
	return (
		<>
			{/* Label */}
			<label htmlFor="key_abilities" className="customLabel">
				You can add {tagsLeft} more
				{tagsLeft === 1 ? ' ability' : ' abilities'}.
			</label>
			{/* Input */}
			<input
				type="text"
				id="key_abilities"
				name="key_abilities"
				autoComplete="off"
				placeholder="Add skill"
				className="customInput"
				style={{
					minWidth: `100%`,
					marginTop: '1.6rem',
				}}
				value={tagsInput}
				onChange={(e) => setTagsInput(e.target.value)}
				onKeyPress={addTag}
				readOnly={tagsLeft === 0 ? true : false}
			/>
			{/* Tags */}
			<ul className="Tags EditProfile__skillsTags">
				{loggedUser.key_abilities &&
					loggedUser.key_abilities.map((tag, index) => (
						<li className="tag" key={index}>
							<span className="tag__text">{tag}</span>
							<span className="tag__icon" onClick={() => removeTag(index)}>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</li>
					))}
			</ul>
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(KeyAbilitiesFields);
