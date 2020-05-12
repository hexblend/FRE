import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Tag({ content }) {
	const [showTag, setShowTag] = useState(true);
	return (
		<Fragment>
			{showTag && (
				<li className="tag">
					<span className="tag__text">
						{content ? content : 'Tag default text'}
					</span>
					<span className="tag__icon">
						<FontAwesomeIcon icon={faTimes} onClick={() => setShowTag(false)} />
					</span>
				</li>
			)}
		</Fragment>
	);
}

Tag.propTypes = {
	content: PropTypes.string,
};

export default Tag;
