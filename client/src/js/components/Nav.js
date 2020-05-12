import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
	return (
		<nav>
			<ul>
				<li>
					<Link to={`${PUBLIC_URL}`}>Home</Link>
					<Link to={`${PUBLIC_URL}/search`}>Search</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
