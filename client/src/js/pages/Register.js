import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AuthNavbar from '../components/AuthNavbar';
import Logo from '../components/Logo';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import CustomLink from '../components/elements/Link';

function Register({ type }) {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [compnayName, setCompanyName] = useState('');

	const PUBLIC_URL = process.env.PUBLIC_URL;
	return (
		<div className="Register">
			<AuthNavbar bg={true} authPage={true} />

			<div className="Register__content">
				<Logo text={true} />
				<form className="Register__form">
					<h2 className="Register__form--title">
						{`Register as 
                          ${type === 'employer' ? 'Employer' : 'Candidate'}`}
					</h2>
					<Input
						type="text"
						id="full_name"
						label="Full name"
						placeholder="Your full name"
						value={fullName}
						handleChange={setFullName}
						minWidth="100%"
					/>
					{type === 'employer' && (
						<Input
							type="text"
							id="company_name"
							label="Company name"
							placeholder="Your company name"
							value={compnayName}
							handleChange={setCompanyName}
							minWidth="100%"
						/>
					)}
					<Input
						type="email"
						id="email"
						label="Your email"
						placeholder="Your email"
						value={email}
						handleChange={setEmail}
						minWidth="100%"
					/>
					<Input
						type="password"
						id="password"
						label="Your password"
						placeholder="Your password"
						value={password}
						handleChange={setPassword}
						minWidth="100%"
					/>
					<Input
						type="password"
						id="second_password"
						label="Re-type password"
						placeholder="Your password"
						value={rePassword}
						handleChange={setRePassword}
						minWidth="100%"
					/>
					<Button
						text={`Register as ${
							type === 'employer' ? 'Employer' : 'Candidate'
						}`}
					/>
				</form>
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
