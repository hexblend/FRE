import React from 'react';
import { connect } from 'react-redux';

import Logo from '../components/Logo';
import AuthNavbar from '../components/AuthNavbar';
import HomeSearch from '../components/pages/home/Search';
import isEmpty from '../components/isEmpty';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
});

function ConnectedHomeHeader({ loggedUser }) {
	return (
		<div className="homeHeader">
			{isEmpty(loggedUser) && <AuthNavbar />}
			<div
				className={`homeHeader__midElems ${!isEmpty(loggedUser) && 'h-100'}`}
			>
				<Logo color="white" text={true} />
				<HomeSearch />
			</div>
		</div>
	);
}

const HomeHeader = connect(mapStateToProps, null)(ConnectedHomeHeader);
export default HomeHeader;
