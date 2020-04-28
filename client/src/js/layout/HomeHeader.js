import React from 'react';

import Logo from '../components/Logo';
import AuthNavbar from '../components/AuthNavbar';
import Search from '../components/Search';

function HomeHeader() {
	const isLogged = false;
	return (
		<div className="homeHeader">
			{!isLogged && <AuthNavbar />}
			<div className="homeHeader__midElems">
				<Logo color="white" text={true} />
				<Search />
			</div>
		</div>
	);
}

export default HomeHeader;
