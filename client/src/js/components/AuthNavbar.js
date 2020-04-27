import React from 'react';
import PropTypes from 'prop-types';

function AuthNavbar({ borders }) {
    return (
        <div className="authNavbar">
            <h1>Auth navbar</h1>
        </div>
    );
};

AuthNavbar.propTypes = {
    borders: PropTypes.bool
}

export default AuthNavbar;