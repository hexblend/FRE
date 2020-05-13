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
		<div className="MainLayout">
			{isEmpty(props.loggedUser) && <AuthNavbar bg={true} />}
			<Header />
			<Sidebar />
			<div
				className="MainLayout__content"
				style={{ padding: '0 4rem 0 25rem' }}
			>
				{props.children}
			</div>
		</div>
	);
}
const MainLayout = connect(mapStateToProps)(ConnectedMainLayout);
export default MainLayout;
