import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import AuthNavbar from '../components/AuthNavbar';
import Logo from '../components/Logo';
import Alert from '../layout/Alert';

import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import CustomLink from '../components/elements/Link';

function Register({ type }) {
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
	const API_URL = process.env.REACT_APP_API_URL;

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

	const [alert, setAlert] = useState({
		type: '',
		text: '',
	});

	let history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		let activeErrors = false;

		// Name validation
		if (fullName === '') {
			setFullNameError('You must add your full name');
			activeErrors = true;
		} else if (fullName.split(' ').length === 1) {
			setFullNameError('Your Full name must contain your First name + Last name');
			activeErrors = true;
		} else {
			setFullNameError('');
			activeErrors = false;
		}
		// Company name validation
		if (companyName === '') {
			setCompanyNameError('You must add your company name');
		} else {
			setCompanyNameError('');
			activeErrors = false;
		}
		// Email validation
		if (email === '') {
			setEmailError('You must add your email');
			activeErrors = true;
		} else if (!/\S+@\S+/.test(email.toLowerCase())) {
			setEmailError('You must enter a valid email address');
			activeErrors = true;
		} else {
			setEmailError('');
			activeErrors = false;
		}
		// Password
		if (password === '') {
			setPasswordError('You must add a password');
			activeErrors = true;
		} else if (password.length < 6) {
			setPasswordError('Your password must have at least 6 characters');
			activeErrors = true;
		} else {
			setPasswordError('');
			activeErrors = false;
		}
		// RePassword
		if (password === '') {
			setRePasswordError('You must re-Type your password here');
			activeErrors = true;
		} else if (password !== rePassword) {
			setRePasswordError('Your both passwords must match');
			activeErrors = true;
		} else {
			setRePasswordError('');
			activeErrors = false;
		}
		// Submit
		if (!activeErrors) {
			const full_name = {
				first_name: fullName.split(' ')[0],
				last_name: fullName.split(' ')[1],
			};
			const company_name = companyName;

			if (type === 'candidate') {
				const newCandidate = {
					full_name,
					email,
					password,
					type: 'candidate',
				};
				axios
					.post(`${API_URL}/api/users/register`, newCandidate)
					.then(() => {
						setAlert({
							type: 'success',
							text: 'Your account has been created! Please log in.',
						});
						setTimeout(() => {
							history.push(`${PUBLIC_URL}/${type}/login`);
							setAlert({ type: '', text: '' });
						}, 2900);
					})
					.catch(() => {
						setAlert({ type: 'error', text: 'Something went wrong!' });
						setTimeout(() => {
							setAlert({ type: '', text: '' });
						}, 2900);
					});
			}
			if (type === 'employer') {
				const newEmployer = {
					full_name,
					email,
					password,
					company_name,
					type: 'employer',
				};

				// Register employer request
				console.log(newEmployer);
			}
		}
	};

	return (
		<div className="Register">
			<Alert type={alert.type} text={alert.text} />
			<AuthNavbar bg={true} authPage={true} />
			<div className="Register__content">
				<Logo text={true} />
				<form className="Register__form" onSubmit={handleSubmit}>
					<h2 className="Register__form--title">
						{`Register as 
                          ${type === 'employer' ? 'Employer' : 'Candidate'}`}
					</h2>
					<Input
						type="text"
						id="fullName"
						label="Full name"
						placeholder="First and last name"
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
					<Button
						text={`Register as ${type === 'employer' ? 'Employer' : 'Candidate'}`}
						btnType="submit"
					/>
				</form>
				<div className="Register__loginLink">
					<>
						...or{' '}
						<CustomLink to={`${PUBLIC_URL}/${type}/login`} text="log in" border={true} />
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
