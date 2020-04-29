import React from 'react';

import Logo from '../components/Logo';
import AuthNavbar from '../components/AuthNavbar';
import HomeSearch from '../components/pages/home/Search';

function HomeHeader() {
	const isLogged = false;
	return (
		<div className="homeHeader">
			{!isLogged && <AuthNavbar />}
			<div className="homeHeader__midElems">
				<Logo color="white" text={true} />
				<HomeSearch />
			</div>
		</div>
	);
}

export default HomeHeader;
