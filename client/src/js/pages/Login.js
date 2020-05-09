import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import AuthNavbar from '../components/AuthNavbar';
import Logo from '../components/Logo';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import CustomLink from '../components/elements/Link';
import Alert from '../layout/Alert';

import { addLoggedUser } from '../redux/actions/index';

const mapDispatchToProps = (dispatch) => {
	return {
		addLoggedUser: (user) => dispatch(addLoggedUser(user)),
	};
};

function ConnectedLogin({ type, addLoggedUser }) {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
	const API_URL = process.env.REACT_APP_API_URL;

	const [alert, setAlert] = useState({
		type: '',
		text: '',
	});

	let history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let activeErrors = false;

		// Email validation
		if (email === '') {
			setEmailError('You must add an email');
			activeErrors = true;
		} else if (!/\S+@\S+/.test(email.toLowerCase())) {
			setEmailError('You must enter a valid email address');
			activeErrors = true;
		} else {
			setEmailError('');
			activeErrors = false;
		}

		// Password validation
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

		// Submit
		if (!activeErrors) {
			const user = {
				email,
				password,
			};
			await axios
				.post(`${API_URL}/api/login`, user, {
					withCredentials: true,
				})
				.then((res) => {
					addLoggedUser(res.data.user);
					setAlert({
						type: 'success',
						text: "You've been logged in",
					});

					setTimeout(() => {
						history.push(`${PUBLIC_URL}`);
						setAlert({ type: '', text: '' });
					}, 1750);
				})
				.catch(() => {
					setAlert({
						type: 'error',
						text: 'Invalid email or password.',
					});
					setTimeout(
						() =>
							setAlert({
								type: '',
								text: '',
							}),
						1500
					);
				});
		}
	};

	return (
		<div className="Register">
			<Alert type={alert.type} text={alert.text} />
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

ConnectedLogin.propTypes = {
	type: PropTypes.string.isRequired,
};

const Login = connect(null, mapDispatchToProps)(ConnectedLogin);
export default Login;
