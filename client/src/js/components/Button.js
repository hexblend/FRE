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

function Button({ type, wide, icon, text }) {
	return (
		<div>
			<button
				className={`btn ${
					type === 'secondary'
						? 'btn-secondary'
						: type === 'full-width'
						? 'btn-full-width'
						: 'btn-primary'
				} 
                ${wide ? 'btn-wide' : ''}
				}`}
			>
				<FontAwesomeIcon icon={icon} className="btn-icon" />
				{text}
			</button>
		</div>
	);
}

Button.propTypes = {
	type: PropTypes.string,
	wide: PropTypes.bool,
	icon: PropTypes.string,
	text: PropTypes.string.isRequired,
};

export default Button;
