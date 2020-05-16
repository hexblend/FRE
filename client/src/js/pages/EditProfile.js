import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../components/elements/Button';
import Input from '../components/elements/Input';
import isEmpty from '../components/isEmpty';

import { updateHeaderView } from '../redux/actions/HeaderActions';
import {
	updateLoggedFullName,
	updateLoggedFullNameError,
	setUpdateFormSubmitted,
} from '../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
	formSubmitted: state.AuthReducer.updatedLoggedUser.formSubmitted,
});

const mapDispatchToProps = (dispatch) => ({
	updateHeaderView: (view) => dispatch(updateHeaderView(view)),
	updateLoggedFullName: (fullName) => dispatch(updateLoggedFullName(fullName)),
	updateLoggedFullNameError: (error) =>
		dispatch(updateLoggedFullNameError(error)),
	setUpdateFormSubmitted: (bool) => dispatch(setUpdateFormSubmitted(bool)),
});

export const ConnectedEditProfile = (props) => {
	const { updateHeaderView } = props;
	const {
		loggedUser,
		updatedLoggedUser,

		updateLoggedFullName,
		updateLoggedFullNameError,

		formSubmitted,
		setUpdateFormSubmitted,
	} = props;

	const history = useHistory();

	// Check User IDs
	useEffect(() => {
		const paramID = props.match.params.id;
		if (!isEmpty(loggedUser)) {
			if (loggedUser._id !== paramID) {
				history.goBack();
			}
		}
	});

	// Update Header View
	useEffect(() => {
		updateHeaderView('editProfile');
	}, [updateHeaderView]);

	// Update updatedLoggedUser
	useEffect(() => {
		if (!isEmpty(loggedUser)) {
			updateLoggedFullName(
				loggedUser.full_name.first_name + ' ' + loggedUser.full_name.last_name
			);
		}
	}, [loggedUser]);

	// Validation
	useEffect(() => {
		if (formSubmitted) {
			setUpdateFormSubmitted(false);

			// Full name
			if (updatedLoggedUser.full_name === '') {
				updateLoggedFullNameError('Your full name must not be empty.');
			} else if (updatedLoggedUser.full_name.split(' ').length !== 2) {
				updateLoggedFullNameError('You must include your first and last name.');
			} else {
				updateLoggedFullNameError('');
			}
		}
	}, [formSubmitted]);

	// Modal
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<div className="EditProfile__content">
				<div className="EditProfile__splitView">
					{/* Left Side */}
					<div className="EditProfile__splitView--left">
						<section className="EditProfile__section">
							<h3 className="EditProfile__section--title">
								General Information
							</h3>
							{!isEmpty(updatedLoggedUser) && (
								<Input
									type="text"
									id="fullName"
									label="Full Name"
									placeholder="First and last name"
									minWidth="100%"
									value={updatedLoggedUser.full_name}
									handleChange={(fullName) => updateLoggedFullName(fullName)}
									error={updatedLoggedUser.errors.full_name}
								/>
							)}
						</section>
						<h3 className="EditProfile__sectionTitle">Badges</h3>
						<h3 className="EditProfile__sectionTitle">Key abilities</h3>
						<h3 className="EditProfile__sectionTitle">Experience</h3>
					</div>
					{/* Right Side */}
					<div className="EditProfile__splitView--right">
						<h3 className="EditProfile__sectionTitle">
							Projects / Achivements / Activities
						</h3>
						<h3 className="EditProfile__sectionTitle">Useful links</h3>
					</div>
				</div>

				<div className="EditProfile__buttons">
					<div></div>
					<Button
						text="Delete profile"
						btnType="button"
						type="delete"
						onClick={() => setOpenModal(true)}
					/>
				</div>
			</div>
		</>
	);
};

const EditProfile = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedEditProfile);

export default EditProfile;
