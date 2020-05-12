import React from 'react';
import PropTypes from 'prop-types';

export const Alert = ({ type, text, style }) => {
	return (
		<>
			{type && text && (
				<div
					className={`Alert ${type === 'success' ? 'success' : 'error'}`}
					style={style}
				>
					<p>{type === 'success' ? 'Success! ' + text : 'Error! ' + text}</p>
				</div>
			)}
		</>
	);
};

Alert.propTypes = {
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};

export default Alert;
