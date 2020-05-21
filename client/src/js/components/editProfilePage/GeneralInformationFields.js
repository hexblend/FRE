import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import Input from '../elements/Input';
import Dropdown from 'react-dropdown';
import isEmpty from '../isEmpty';

import { updateLoggedField, updateLoggedKeyinObj } from '../../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
});

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoggedField: (obj) => dispatch(updateLoggedField(obj)),
		updateLoggedKeyinObj: (obj) => dispatch(updateLoggedKeyinObj(obj)),
	};
};

export const GeneralInformationFields = (props) => {
	const {
		loggedUser,
		updatedLoggedUser,
		updateLoggedField,
		updateLoggedKeyinObj,
	} = props;

	// Status
	let statusOptions = [];
	if (!isEmpty(loggedUser)) {
		if (loggedUser.type === 'candidate') {
			statusOptions = [
				{ label: 'None', value: 'none' },
				{ label: 'Waiting for offers', value: 'waiting for offers' },
				{ label: 'Interviewing', value: 'interviewing' },
				{ label: 'Employed', value: 'employed' },
			];
		}
		if (loggedUser.type === 'employer') {
			statusOptions = [
				{ label: 'Hiring', value: 'hiring' },
				{ label: 'Not Hiring', value: 'not hiring' },
			];
		}
	}

	return (
		<>
			{/* Full name */}
			<Input
				type="text"
				id="fullName"
				label="Full Name"
				placeholder="First and last name"
				minWidth="100%"
				value={loggedUser.full_name}
				handleChange={(fullName) =>
					updateLoggedField({
						fieldName: 'full_name',
						fieldValue: fullName,
					})
				}
				error={updatedLoggedUser.errors.full_name}
			/>
			{/* Company name*/}
			{loggedUser.type === 'employer' && (
				<Input
					type="text"
					id="companyName"
					label="Company name"
					placeholder="Your company name"
					minWidth="100%"
					value={loggedUser.company.name}
					handleChange={(companyName) =>
						updateLoggedKeyinObj({
							object: 'company',
							key: 'name',
							value: companyName,
						})
					}
					error={updatedLoggedUser.errors.company_name}
				/>
			)}
			{/* Email */}
			<Input
				type="email"
				id="email"
				label="Your email"
				placeholder="Your email"
				minWidth="100%"
				value={loggedUser.email}
				handleChange={(email) =>
					updateLoggedField({
						fieldName: 'email',
						fieldValue: email,
					})
				}
				error={updatedLoggedUser.errors.email}
			/>
			{/* Status */}
			<p className="EditProfile__section--label">Status</p>
			<Dropdown
				value={loggedUser.status}
				onChange={(option) =>
					updateLoggedField({
						fieldName: 'status',
						fieldValue: option.value,
					})
				}
				options={statusOptions}
				controlClassName="EditProfile__statusDropdown"
				placeholderClassName="EditProfile__statusDropdown--placeholder"
				menuClassName="EditProfile__statusDropdown--menu"
				arrowClosed={<FontAwesomeIcon icon={faCaretDown} />}
				arrowOpen={<FontAwesomeIcon icon={faCaretDown} />}
			/>
			{/* Company website */}
			{loggedUser.type === 'employer' && (
				<Input
					type="text"
					id="companyWebsite"
					label="Company website"
					placeholder="http://your-company.com"
					minWidth="100%"
					value={loggedUser.company.website}
					handleChange={(companyWebsite) =>
						updateLoggedKeyinObj({
							object: 'company',
							key: 'website',
							value: companyWebsite,
						})
					}
				/>
			)}
			{/* Description */}
			<Input
				type="textarea"
				id="description"
				label="Description"
				placeholder="Profile description"
				minWidth="100%"
				value={loggedUser.description}
				handleChange={(description) =>
					updateLoggedField({
						fieldName: 'description',
						fieldValue: description,
					})
				}
				error={updatedLoggedUser.errors.full_name}
			/>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformationFields);
