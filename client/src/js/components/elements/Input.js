import React from 'react';
import PropTypes from 'prop-types';

function Input({
	id,
	type,
	label,
	placeholder,
	noBG,
	noShadow,
	whiteLabel,
	minWidth,
	error,
	value,
	handleChange,
}) {
	return (
		<div className="customInput__wrapper">
			{label && (
				<label
					htmlFor={id}
					className={`customLabel ${whiteLabel && 'whiteLabel'}`}
				>
					{label}
				</label>
			)}
			{type !== 'textarea' && (
				<>
					<input
						type={type}
						name={id}
						id={id}
						value={value}
						onChange={(e) => handleChange(e.target.value)}
						placeholder={placeholder}
						className={`customInput 
                                ${noBG && 'noBG'} 
                                ${noShadow && 'noShadow'}
                              `}
						style={{ minWidth: `${minWidth}` }}
					/>
					{error && <p className="customInput__error">{error}</p>}
				</>
			)}
			{type === 'textarea' && (
				<textarea
					name={id}
					id={id}
					cols="30"
					rows="10"
					className="customTextarea"
					value={value}
					onChange={(e) => handleChange(e.target.value)}
					placeholder={placeholder}
				></textarea>
			)}
		</div>
	);
}

Input.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	noBG: PropTypes.bool,
	noShadow: PropTypes.bool,
	whiteLabel: PropTypes.bool,
	minWidth: PropTypes.string,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	error: PropTypes.string,
};

export default Input;
