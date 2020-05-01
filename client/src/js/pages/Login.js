import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AuthNavbar from '../components/AuthNavbar';
import Logo from '../components/Logo';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import CustomLink from '../components/elements/Link';

function Login({ type }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const PUBLIC_URL = process.env.PUBLIC_URL;
	return (
		<div className="Register">
			<AuthNavbar bg={true} authPage={true} />

			<div className="Register__content">
				<Logo text={true} />
				<form className="Register__form">
					<h2 className="Register__form--title">
						{`Login as 
                          ${type === 'employer' ? 'Employer' : 'Candidate'}`}
					</h2>
					<Input
						type="email"
						label="Your email"
						placeholder="Your email"
						value={email}
						handleChange={setEmail}
						minWidth="100%"
					/>
					<Input
						type="password"
						label="Your password"
						placeholder="Your password"
						value={password}
						handleChange={setPassword}
						minWidth="100%"
					/>
					<Button
						text={`Login as ${type === 'employer' ? 'Employer' : 'Candidate'}`}
					/>
				</form>
				<div className="Register__loginLink">
					<>
						...or{' '}
						<CustomLink
							to={`${PUBLIC_URL}/${type}/register`}
							text="register"
							border={true}
						/>
					</>
				</div>
			</div>
		</div>
	);
}

Login.propTypes = {
	type: PropTypes.string.isRequired,
};

export default Login;
