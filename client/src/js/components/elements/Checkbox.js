import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Checkbox(props) {
	const { textUnchecked, textChecked, checked, setChecked, label } = props;

	return (
		<div className="Checkbox">
			{label && <p className="Checkbox__label">{label}</p>}
			<label className="Checkbox__container">
				<input
					type="checkbox"
					className="Checkbox__input"
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
				/>
				<span className="Checkbox__mark">
					{checked && <FontAwesomeIcon icon={faCheck} />}
				</span>
				{checked ? textChecked : textUnchecked}
			</label>
		</div>
	);
}

Checkbox.propTypes = {
	textUnchecked: PropTypes.string,
	textChecked: PropTypes.string,
	setChecked: PropTypes.func.isRequired,
	label: PropTypes.string,
};

export default Checkbox;
