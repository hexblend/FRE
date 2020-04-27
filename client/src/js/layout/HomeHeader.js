import React from 'react';

import Logo from '../components/Logo';
import AuthNavbar from '../components/AuthNavbar';
import Search from '../components/Search';

function HomeHeader() {
    const isLogged = true;
    return (
        <div className="homeHeader">
            {isLogged && <AuthNavbar borders={true} />}
			<Logo color="white" text={true} />
			<Search />
        </div>
    );
}

export default HomeHeader;