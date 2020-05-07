import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import Nav from '../components/Nav';
import StyleGuide from '../pages/StyleGuide';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Footer from '../layout/Footer';

import { addLoggedUser } from '../redux/actions/index';

const mapDispatchToProps = (dispatch) => {
	return {
		addLoggedUser: (user) => dispatch(addLoggedUser(user)),
	};
};

function ConnectedApp({ addLoggedUser }) {
	useEffect(() => {
		const user = localStorage.getItem('user');
		if (user) {
			addLoggedUser(JSON.parse(user));
		}
	});

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
