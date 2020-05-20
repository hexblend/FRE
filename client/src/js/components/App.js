import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { LastLocationProvider } from 'react-router-last-location';

import StyleGuide from '../pages/StyleGuide';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import Footer from '../layout/Footer';

import MainLayout from '../layout/MainLayout';

import { addLoggedUser } from '../redux/actions/AuthActions';

const mapDispatchToProps = (dispatch) => {
	return {
		addLoggedUser: (user) => dispatch(addLoggedUser(user)),
	};
};

function ConnectedApp({ addLoggedUser }) {
	useEffect(() => {
		const getSession = async () => {
			await axios
				.get(`${process.env.REACT_APP_API_URL}/api/check-session`, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.status === 200) {
						addLoggedUser({
							...res.data.user,
							full_name:
								res.data.user.full_name.first_name +
								' ' +
								res.data.user.full_name.last_name,
						});
					}
				});
		};
		getSession();
	}, [addLoggedUser]);

	return (
		<Router>
			<LastLocationProvider>
				<Switch>
					<Route path="/style" component={StyleGuide} />

					<Route exact path="/" component={Home} />

					{/* Auth */}
					<Route path="/candidate/register">
						<Register type="candidate" />
					</Route>
					<Route path="/candidate/login">
						<Login type="candidate" />
					</Route>
					<Route path="/employer/register">
						<Register type="employer" />
					</Route>
					<Route path="/employer/login">
						<Login type="employer" />
					</Route>

					<MainLayout>
						<Route path="/search" component={Search} />
						<Route exact path="/profile/:id" component={Profile} />
						<Route exact path="/profile/:id/edit" component={EditProfile} />
					</MainLayout>
				</Switch>
				<Footer />
			</LastLocationProvider>
		</Router>
	);
}

const App = connect(null, mapDispatchToProps)(ConnectedApp);
export default App;
