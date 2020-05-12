import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import StyleGuide from '../pages/StyleGuide';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Footer from '../layout/Footer';

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
						addLoggedUser(res.data.user);
					}
				});
		};
		getSession();
	}, [addLoggedUser]);

	return (
		<Router>
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

				<Route path="/search" component={Search} />
			</Switch>
			<Footer />
		</Router>
	);
}

const App = connect(null, mapDispatchToProps)(ConnectedApp);
export default App;
