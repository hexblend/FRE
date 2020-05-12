import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Sidebar from './Sidebar';
import AuthNavbar from '../components/AuthNavbar';
import isEmpty from '../components/isEmpty';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
});

function ConnectedMainLayout(props) {
	return (
		<div>
			{isEmpty(props.loggedUser) && <AuthNavbar bg={true} />}
			<Header />
			<Sidebar />
			{props.children}
		</div>
	);
}
const MainLayout = connect(mapStateToProps)(ConnectedMainLayout);
export default MainLayout;
