import React from 'react';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

// Use all icons instead of one at the time
const iconList = Object.keys(Icons)
    .filter(key => key !== 'fas' && key !== 'prefix')
    .map(icon => Icons[icon]);
library.add(...iconList);

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
    icon,
}) {
    return (
        <div className="customInput__wrapper">
            {label && (
                <label
                    htmlFor={id}
                    className={`customLabel ${whiteLabel && 'whiteLabel'}`}>
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
                        onChange={e => handleChange(e.target.value)}
                        placeholder={placeholder}
                        className={`customInput 
                                ${noBG && 'noBG'} 
                                ${noShadow && 'noShadow'}
                              `}
                        style={{
                            minWidth: `${minWidth}`,
                            maxWidth: `${minWidth}`,
                            paddingLeft: `${icon && '4.4rem'}`,
                        }}
                        autoComplete={id}
                    />
                    {error && <p className="customInput__error">{error}</p>}
                    {icon && (
                        <FontAwesomeIcon
                            icon={icon}
                            className="customInput__icon"
                        />
                    )}
                </>
            )}
            {type === 'textarea' && (
                <>
                    <textarea
                        name={id}
                        id={id}
                        cols="30"
                        rows="10"
                        className="customTextarea"
                        value={value}
                        onChange={e => handleChange(e.target.value)}
                        placeholder={placeholder}
                        style={{
                            minWidth: `${minWidth}`,
                            maxWidth: `${minWidth}`,
                        }}
                        autoComplete="off"></textarea>
                    {error && <p className="customInput__error">{error}</p>}
                </>
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
    icon: PropTypes.string,
};

export default Input;
