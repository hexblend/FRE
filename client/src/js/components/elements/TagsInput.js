import React, { useState } from 'react';
import Input from './Input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

function InputWithTags({
	id,
	minWidth,
	placeholder,
	label,
	whiteLabel,
	noBG,
	noShadow,
}) {
	const [tags, setTags] = useState([]);
	const [tagsWidth, setTagsWidth] = useState('');
	const [error, setError] = useState('');
	const [info, setInfo] = useState(3);

	const addTag = (e) => {
		const tag = e.target.value;
		if (e.key === 'Enter' && tag !== '') {
			if (tags.includes(tag)) {
				setError("You can't search for the same job twice.");
			} else if (tags.length === 3) {
				setError("You can't search for more than 3 job titles.");
			} else {
				setTags([...tags, tag]);
				setInfo((info) => info - 1);
				setError('');
			}
			e.target.value = '';
		}
	};

	const removeTag = (index) => {
		setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
		setInfo((info) => info + 1);
		setError('');
	};

	const refCallback = (element) => {
		if (element) {
			setTagsWidth(element.getBoundingClientRect().width + 16 + 'px');
		}
	};
	return (
		<div className="TagsInput">
			<label
				htmlFor={id}
				className={`customLabel ${whiteLabel && 'whiteLabel'}`}
			>
				{label}
			</label>
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
			<input
				type="text"
				id={id}
				name={id}
				className="customInput"
				placeholder={placeholder}
				className={`customInput ${noBG && 'noBG'} ${noShadow && 'noShadow'}`}
				style={{
					minWidth: `${tagsWidth + minWidth}`,
					paddingLeft: `${tagsWidth}`,
				}}
				onKeyUp={(e) => addTag(e)}
				readOnly={info === 0 ? true : false}
			/>
			<p className="customInput__error">{error}</p>
			{!error && (
				<p
					className="customInput__info"
					style={{
						color: `${info === 0 ? 'black' : 'white'}`,
						fontWeight: `${info === 0 ? 400 : 300}`,
					}}
				>
					{info} job titles left
				</p>
			)}
		</div>
	);
}

InputWithTags.propTypes = {
	minWidth: PropTypes.string,
	placeholder: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	whiteLabel: PropTypes.bool,
	noBG: PropTypes.bool,
	noShadow: PropTypes.bool,
};

export default InputWithTags;
