import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Nav from '../components/Nav';
import StyleGuide from '../pages/StyleGuide';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Footer from '../layout/Footer';

export default function App() {
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
			</Switch>
			<Footer />
		</Router>
	);
}
