import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../components/elements/Button';
import Input from '../components/elements/Input';
import isEmpty from '../components/isEmpty';

import { updateHeaderView } from '../redux/actions/HeaderActions';
import {
	updateLoggedField,
	updateLoggedFieldError,
	setUpdateFormSubmitted,
} from '../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
	formSubmitted: state.AuthReducer.updatedLoggedUser.formSubmitted,
});

const mapDispatchToProps = (dispatch) => ({
	updateHeaderView: (view) => dispatch(updateHeaderView(view)),
	updateLoggedField: (obj) => dispatch(updateLoggedField(obj)),
	updateLoggedFieldError: (obj) => dispatch(updateLoggedFieldError(obj)),
	setUpdateFormSubmitted: (bool) => dispatch(setUpdateFormSubmitted(bool)),
});

export const ConnectedEditProfile = (props) => {
	const { updateHeaderView } = props;
	const {
		loggedUser,
		updatedLoggedUser,

		updateLoggedField,
		updateLoggedFieldError,

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
			updateLoggedField({
				fieldName: 'full_name',
				fieldValue:
					loggedUser.full_name.first_name +
					' ' +
					loggedUser.full_name.last_name,
			});
			updateLoggedField({ fieldName: 'email', fieldValue: loggedUser.email });
		}
	}, [loggedUser]);

	// Validation
	useEffect(() => {
		if (formSubmitted) {
			setUpdateFormSubmitted(false);

			// Full name
			if (updatedLoggedUser.full_name === '') {
				updateLoggedFieldError({
					fieldName: 'full_name',
					error: 'Your full name must not be empty.',
				});
			} else if (updatedLoggedUser.full_name.split(' ').length !== 2) {
				updateLoggedFieldError({
					fieldName: 'full_name',
					error: 'Your must include your first and last name.',
				});
			} else {
				updateLoggedFieldError({ fieldName: 'full_name', error: '' });
			}

			// Email
			if (updatedLoggedUser.email === '') {
				updateLoggedFieldError({
					fieldName: 'email',
					error: "You can't leave your email empty.",
				});
			} else if (!/\S+@\S+/.test(updatedLoggedUser.email.toLowerCase())) {
				updateLoggedFieldError({
					fieldName: 'email',
					error: 'You must enter a valie email type',
				});
			} else {
				updateLoggedFieldError({ fieldName: 'email', error: '' });
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
								<>
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
								</>
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
