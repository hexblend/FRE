import React from 'react';
import { connect } from 'react-redux';

import Logo from '../components/Logo';
import AuthNavbar from '../components/AuthNavbar';
import HomeSearch from '../components/pages/home/Search';

const mapStateToProps = (state) => ({ loggedUser: state.loggedUser });

function ConnectedHomeHeader({ loggedUser }) {
	return (
		<div className="homeHeader">
			{!loggedUser && <AuthNavbar />}
			<div className={`homeHeader__midElems ${loggedUser && 'h-100'}`}>
				<Logo color="white" text={true} />
				<HomeSearch />
			</div>
		</div>
	);
}

const HomeHeader = connect(mapStateToProps, null)(ConnectedHomeHeader);
export default HomeHeader;
