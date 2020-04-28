import React from 'react';

import Logo from '../components/Logo';
import AuthNavbar from '../components/AuthNavbar';
import Search from '../components/Search';

function HomeHeader() {
	const isLogged = false;
	return (
		<div className="homeHeader">
			{!isLogged && <AuthNavbar />}
			<Logo color="white" text={true} />
			<Search />
		</div>
	);
}

export default HomeHeader;
