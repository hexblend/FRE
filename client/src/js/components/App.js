import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Nav from '../components/Nav';
import Home from '../pages/Home';
import About from '../pages/About';
import StyleGuide from '../pages/StyleGuide';

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path="/style" component={StyleGuide} />
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
			</Switch>
		</Router>
	);
}
