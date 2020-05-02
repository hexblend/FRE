import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthNavbar from '../components/AuthNavbar';
import Logo from '../components/Logo';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import CustomLink from '../components/elements/Link';

function Register({ type }) {
	const [fullName, setFullName] = useState('');
	const [fullNameError, setFullNameError] = useState('');

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [rePassword, setRePassword] = useState('');
	const [rePasswordError, setRePasswordError] = useState('');

	const [companyName, setCompanyName] = useState('');
	const [companyNameError, setCompanyNameError] = useState('');

	const PUBLIC_URL = process.env.PUBLIC_URL;

	const handleSubmit = (e) => {
		// prettier-ignore
		if (fullName === '' || email === '' || password === '' || rePassword === '' || companyName === '') e.preventDefault();
		// prettier-ignore
		if (fullNameError !== '' || emailError !== '' || passwordError !== '' || rePasswordError !== '' || companyNameError !== '') e.preventDefault();

		// Name validation
		if (fullName === '') {
			setFullNameError('You must add your full name');
		} else if (fullName.split(' ').length === 1) {
			setFullNameError(
				'Your Full name must contain your First name + Last name'
			);
		} else {
			setFullNameError('');
		}
		// Company name validation
		if (companyName === '') {
			setCompanyNameError('You must add your company name');
		} else {
			setCompanyNameError('');
		}
		// Email validation
		if (email === '') {
			setEmailError('You must add your email');
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
		// RePassword
		if (password === '') {
			setRePasswordError('You must re-Type your password here');
		} else if (password !== rePassword) {
			setRePasswordError('Your both passwords must match');
		} else {
			setRePasswordError('');
		}
	};

	return (
		<div className="Register">
			<AuthNavbar bg={true} authPage={true} />

			<div className="Register__content">
				<Logo text={true} />
				<div className="Register__form">
					<h2 className="Register__form--title">
						{`Register as 
                          ${type === 'employer' ? 'Employer' : 'Candidate'}`}
					</h2>
					<Input
						type="text"
						id="fullName"
						label="Full name"
						placeholder="Your full name"
						minWidth="100%"
						value={fullName}
						handleChange={setFullName}
						error={fullNameError}
					/>
					{type === 'employer' && (
						<Input
							type="text"
							id="companyName"
							label="Company name"
							placeholder="Your company name"
							minWidth="100%"
							value={companyName}
							handleChange={setCompanyName}
							error={companyNameError}
						/>
					)}
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
					<Input
						type="password"
						id="rePassword"
						label="Re-type password"
						placeholder="Your password again"
						minWidth="100%"
						value={rePassword}
						handleChange={setRePassword}
						error={rePasswordError}
					/>
					<Link to={`${PUBLIC_URL}`} onClick={handleSubmit}>
						<Button
							text={`Register as ${
								type === 'employer' ? 'Employer' : 'Candidate'
							}`}
							onClick={handleSubmit}
						/>
					</Link>
				</div>
				<div className="Register__loginLink">
					<>
						...or{' '}
						<CustomLink
							to={`${PUBLIC_URL}/${type}/login`}
							text="log in"
							border={true}
						/>
					</>
				</div>
			</div>
		</div>
	);
}

Register.propTypes = {
	type: PropTypes.string.isRequired,
};

export default Register;
