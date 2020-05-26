import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Sidebar from './Sidebar';
import AuthNavbar from '../components/AuthNavbar';
import isEmpty from '../components/isEmpty';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
});

function ConnectedMainLayout(props) {
	const [sidebarView, setSidebarView] = useState('');
	const url = window.location.href;

	// Set sidebar view
	useEffect(() => {
		if (url.includes('/messages')) {
			setSidebarView('messages');
		} else {
			setSidebarView('default');
		}
	}, [setSidebarView, url]);

	return (
		<div className="MainLayout">
			{isEmpty(props.loggedUser) && <AuthNavbar bg={true} />}
			<Header />
			<Sidebar view={sidebarView} />
			<div className="MainLayout__content" style={{ padding: '0 4rem 0 25rem' }}>
				{props.children}
			</div>
		</div>
	);
}
const MainLayout = connect(mapStateToProps)(ConnectedMainLayout);
export default MainLayout;
