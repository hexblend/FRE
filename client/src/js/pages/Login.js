import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthNavbar from '../components/AuthNavbar';
import Logo from '../components/Logo';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import CustomLink from '../components/elements/Link';

function Login({ type }) {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const PUBLIC_URL = process.env.PUBLIC_URL;

	const handleSubmit = (e) => {
		if (email === '' || password === '') e.preventDefault();
		if (emailError !== '' || passwordError !== '') e.preventDefault();
		// Email validation
		if (email === '') {
			setEmailError('You must add an email');
		} else if (!/\S+@\S+/.test(email.toLowerCase())) {
			setEmailError('You must enter a valid email address');
		} else {
			setEmailError('');
		}
		// Password
		if (password === '') {
			setPasswordError('You must add a password');
		} else if (password.length < 6) {
			setPasswordError('Your password must have at least 6 characters');
		} else {
			setPasswordError('');
		}
	};

	return (
		<div className="Register">
			<AuthNavbar bg={true} authPage={true} />

			<div className="Register__content">
				<Logo text={true} />
				<div className="Register__form">
					<h2 className="Register__form--title">
						{`Login as 
                          ${type === 'employer' ? 'Employer' : 'Candidate'}`}
					</h2>
					<Input
						type="email"
						id="email"
						label="Your email"
						placeholder="Your email"
						minWidth="100%"
						value={email}
						handleChange={setEmail}
						error={emailError}
					/>
					<Input
						type="password"
						id="password"
						label="Your password"
						placeholder="Your password"
						minWidth="100%"
						value={password}
						handleChange={setPassword}
						error={passwordError}
					/>
					<Link to={`${PUBLIC_URL}`} onClick={handleSubmit}>
						<Button
							text={`Login as 
								   ${type === 'employer' ? 'Employer' : 'Candidate'}
							`}
						/>
					</Link>
				</div>
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
