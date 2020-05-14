import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

// Use all icons instead of one at the time
const iconList = Object.keys(Icons)
	.filter((key) => key !== 'fas' && key !== 'prefix')
	.map((icon) => Icons[icon]);
library.add(...iconList);

function Button({ type, wide, icon, text, onClick, btnType }) {
	return (
		<button
			className={`btn 
				${type === 'secondary' && 'btn-secondary'}
				${type === 'delete' && 'btn-delete'}
				${type === 'full-width' && 'btn-full-width'}
				${!type && 'btn-primary'}
				${wide ? 'btn-wide' : ''}

				`}
			onClick={onClick}
			type={btnType}
		>
			{icon && <FontAwesomeIcon icon={icon} className="btn-icon" />}
			{text}
		</button>
	);
}

Button.propTypes = {
	type: PropTypes.string,
	wide: PropTypes.bool,
	icon: PropTypes.string,
	text: PropTypes.string.isRequired,
	btnType: PropTypes.string,
};

export default Button;
