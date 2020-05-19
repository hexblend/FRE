import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import Input from '../elements/Input';
import Dropdown from 'react-dropdown';
import isEmpty from '../isEmpty';

import { updateLoggedField } from '../../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
});

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoggedField: (obj) => dispatch(updateLoggedField(obj)),
	};
};

export const GeneralInformationFields = (props) => {
	const { loggedUser, updatedLoggedUser, updateLoggedField } = props;

	// Status
	let statusOptions = [];
	if (!isEmpty(loggedUser)) {
		if (loggedUser.type === 'candidate') {
			statusOptions = [
				{ label: 'None', value: 'None' },
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
				value={updatedLoggedUser.full_name}
				handleChange={(fullName) =>
					updateLoggedField({
						fieldName: 'full_name',
						fieldValue: fullName,
					})
				}
				error={updatedLoggedUser.errors.full_name}
			/>
			{/* Email */}
			<Input
				type="email"
				id="email"
				label="Your email"
				placeholder="Your email"
				minWidth="100%"
				value={updatedLoggedUser.email}
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
				value={updatedLoggedUser.status}
				onChange={(option) =>
					updateLoggedField({
						fieldName: 'status',
						fieldValue: option,
					})
				}
				options={statusOptions}
				controlClassName="EditProfile__statusDropdown"
				placeholderClassName="EditProfile__statusDropdown--placeholder"
				menuClassName="EditProfile__statusDropdown--menu"
				arrowClosed={<FontAwesomeIcon icon={faCaretDown} />}
				arrowOpen={<FontAwesomeIcon icon={faCaretDown} />}
			/>
			{/* Description */}
			<Input
				type="textarea"
				id="description"
				label="Description"
				placeholder="Profile description"
				minWidth="100%"
				value={updatedLoggedUser.description}
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
