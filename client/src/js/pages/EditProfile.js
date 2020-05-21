import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Button from '../components/elements/Button';
import isEmpty from '../components/isEmpty';
import ConfirmationModal from '../components/ConfirmationModal';
import Alert from '../layout/Alert';

import GeneralInformationFields from '../components/editProfilePage/GeneralInformationFields';
import BadgesFields from '../components/editProfilePage/BadgesFields';
import KeyAbilitiesFields from '../components/editProfilePage/KeyAbilitiesFields';
import UsefulLinksFields from '../components/editProfilePage/UsefulLinksFields';
import ExperienceFields from '../components/editProfilePage/ExperienceFields';
import ProjectsFields from '../components/editProfilePage/ProjectsFields';
import AvailablePositionsFields from '../components/editProfilePage/AvailablePositionsFields';

import { updateHeaderView } from '../redux/actions/HeaderActions';
import {
	addLoggedUser,
	updateLoggedField,
	updateLoggedFieldError,
	updateLoggedObjFieldError,
	setUpdateFormSubmitted,
	updateLoggedKeyinObj,
} from '../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
});

const mapDispatchToProps = (dispatch) => ({
	updateHeaderView: (view) => dispatch(updateHeaderView(view)),
	addLoggedUser: (user) => dispatch(addLoggedUser(user)),
	updateLoggedField: (obj) => dispatch(updateLoggedField(obj)),
	updateLoggedFieldError: (obj) => dispatch(updateLoggedFieldError(obj)),
	updateLoggedObjFieldError: (obj) => dispatch(updateLoggedObjFieldError(obj)),
	setUpdateFormSubmitted: (bool) => dispatch(setUpdateFormSubmitted(bool)),
	updateLoggedKeyinObj: (obj) => dispatch(updateLoggedKeyinObj(obj)),
});

export const ConnectedEditProfile = (props) => {
	const { updateHeaderView } = props;
	const {
		loggedUser,
		updatedLoggedUser,
		updateLoggedField,
		updateLoggedFieldError,
		updateLoggedKeyinObj,
		setUpdateFormSubmitted,
	} = props;

	const history = useHistory();
	const API_URL = process.env.REACT_APP_API_URL;
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	const [jobsSuggestions, setJobsSuggestions] = useState([]);
	const [locationSuggestions, setLocationSuggestions] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [alert, setAlert] = useState({ type: '', text: '' });

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

	// Validation
	useEffect(() => {
		if (updatedLoggedUser.formSubmitted) {
			setUpdateFormSubmitted(false);
			let valid = true;
			// Full name
			if (loggedUser.full_name === '') {
				updateLoggedFieldError({
					fieldName: 'full_name',
					error: 'Your full name must not be empty.',
				});
				valid = false;
			} else if (loggedUser.full_name.split(' ').length !== 2) {
				updateLoggedFieldError({
					fieldName: 'full_name',
					error: 'Your must include your first and last name.',
				});
				valid = false;
			} else {
				updateLoggedFieldError({ fieldName: 'full_name', error: '' });
			}

			// Company name
			if (loggedUser.type === 'employer' && loggedUser.company.name === '') {
				updateLoggedFieldError({
					fieldName: 'company_name',
					error: 'You must include your company name.',
				});
				valid = false;
			} else {
				updateLoggedFieldError({ fieldName: 'company_name', error: '' });
				valid = true;
			}

			// Email
			if (loggedUser.email === '') {
				updateLoggedFieldError({
					fieldName: 'email',
					error: "You can't leave your email empty.",
				});
				valid = false;
			} else if (!/\S+@\S+/.test(loggedUser.email.toLowerCase())) {
				updateLoggedFieldError({
					fieldName: 'email',
					error: 'You must enter a valid email type.',
				});
				valid = false;
			} else {
				updateLoggedFieldError({ fieldName: 'email', error: '' });
			}
			// Job Title
			const jobTitle = loggedUser.job_title;
			if (jobTitle) {
				const jobWords = jobTitle.split(' ');
				jobWords.forEach((word) => {
					if (word[0] !== word[0].toUpperCase()) {
						updateLoggedFieldError({
							fieldName: 'job_title',
							error: 'You must select a valid job title.',
						});
						setJobsSuggestions([]);
						valid = false;
					} else {
						updateLoggedFieldError({ fieldName: 'job_title', error: '' });
					}
				});
			}
			// Location
			const cityName = loggedUser.city;
			if (cityName) {
				const cityWords = cityName.split(' ');
				cityWords.forEach((word) => {
					if (word[0] !== word[0].toUpperCase()) {
						updateLoggedFieldError({
							fieldName: 'city',
							error: 'Please select a location from the list.',
						});
						setLocationSuggestions([]);
						valid = false;
					} else {
						updateLoggedFieldError({ fieldName: 'city', error: '' });
						setLocationSuggestions([]);
					}
				});
			}
			// Years of activity
			const years_of_activity = loggedUser.years_of_activity;
			if (years_of_activity) {
				if (isNaN(years_of_activity) || years_of_activity < 0) {
					updateLoggedFieldError({
						fieldName: 'years_of_activity',
						error: 'You must enter a valid number.',
					});
					valid = false;
				}
			} else {
				updateLoggedFieldError({ fieldName: 'years_of_activity', error: '' });
			}

			// Submit form
			handleSubmit(valid);
		}
	}, [updatedLoggedUser, setUpdateFormSubmitted, updateLoggedFieldError]);

	// Submit form
	const handleSubmit = (valid) => {
		if (valid) {
			const updatedFields = {
				social_media: { ...loggedUser.social_media },
				company: { ...loggedUser.company },
			};

			const addField = (field) => {
				if (updatedLoggedUser[field]) {
					updatedFields[field] = updatedLoggedUser[field];
				}
			};
			if (updatedLoggedUser.full_name.split(' ').length === 2) {
				updatedFields.full_name = {
					first_name: updatedLoggedUser.full_name.split(' ')[0],
					last_name: updatedLoggedUser.full_name.split(' ')[1],
				};
			}
			if (updatedLoggedUser.company.name) {
				updatedFields.company.name = updatedLoggedUser.company.name;
			}
			if (updatedLoggedUser.company.website) {
				updatedFields.company.website = updatedLoggedUser.company.website;
			}
			if (updatedLoggedUser.company.type) {
				updatedFields.company.type = updatedLoggedUser.company.type;
			}
			addField('email');
			addField('type');
			addField('job_title');
			addField('city');
			addField('inactiveAccount');
			addField('status');
			addField('remote_worker');
			addField('years_of_activity');
			addField('higher_education');
			addField('description');
			addField('location');
			if (updatedLoggedUser.key_abilities.length !== 0) {
				updatedFields.key_abilities = updatedLoggedUser.key_abilities;
			}

			const social_media = {};
			const addSMField = (field) => {
				if (updatedLoggedUser['social_media'][field] === '') {
					social_media[field] = ' ';
				} else {
					social_media[field] = updatedLoggedUser['social_media'][field];
				}
			};
			addSMField('facebook');
			addSMField('twitter');
			addSMField('instagram');
			addSMField('linkedin');
			addSMField('github');
			addSMField('behance');
			addSMField('personal_website');
			updatedFields.social_media = social_media;

			updatedFields.experience = loggedUser.experience;
			updatedFields.projects = loggedUser.projects;
			updatedFields.available_positions = loggedUser.available_positions;

			if (updatedFields.job_title && updatedFields.city) {
				updatedFields.inactiveAccount = 'false';
			}

			axios
				.put(`${API_URL}/api/users/${loggedUser._id}`, updatedFields)
				.then(() => {
					setAlert({ type: 'success', text: 'Profile updated.' });
					setTimeout(
						() => (window.location.href = `${PUBLIC_URL}/profile/${loggedUser._id}`),
						2000
					);
				})
				.catch(() => {
					setAlert({ type: 'error', text: 'Something went wrong.' });
				});
		}
	};

	// Handle User Removal
	const handleDeleteUser = () => {
		// Log user out
		axios
			.get(`${API_URL}/api/logout`, { withCredentials: true })
			.then(() => {
				addLoggedUser({});
			})
			.catch(() => {
				setAlert({
					type: 'error',
					text: 'Something went wrong',
				});
			});
		// Delete user account
		axios
			.delete(`${API_URL}/api/users/${loggedUser._id}`, {
				withCredentials: true,
			})
			.then(() => {
				setAlert({
					type: 'success',
					text: 'Your account and all the data has been deleted from our system.',
				});
				setTimeout(() => (window.location.href = '/'), 3000);
			})
			.catch(() => {
				setAlert({
					type: 'error',
					text: 'Something went wrong',
				});
			});
	};
	// Change Avatar
	const [newAvatar, setNewAvatar] = useState(loggedUser.avatar);
	const handleChangeAvatar = (e) => {
		if (e.target.files.length) {
			const image = e.target.files[0];
			setNewAvatar(image);
			const formData = new FormData();
			formData.append('image', image);
			axios
				.patch(`${API_URL}/api/users/changeAvatar/${loggedUser._id}`, formData, {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				})
				.then(() => setNewAvatar(loggedUser.avatar));
		}
	};
	return (
		<>
			<div className="EditProfile__content">
				{/* Alert / Modal */}
				<Alert type={alert.type} text={alert.text} />
				<ConfirmationModal
					text="Are you sure you want to delete your profile? This action can't be reversed."
					openModal={openModal}
					setOpenModal={setOpenModal}
				>
					<Button
						btnType="button"
						type="delete"
						text="Delete profile"
						onClick={() => handleDeleteUser()}
					/>
				</ConfirmationModal>

				<div className="EditProfile__splitView">
					{/* Left Side */}
					<div className="EditProfile__splitView--left">
						<section className="EditProfile__section">
							<h3 className="EditProfile__sectionTitle">General Information</h3>
							<GeneralInformationFields />
						</section>
						<section className="EditProfile__section">
							<h3 className="EditProfile__sectionTitle">Badges</h3>
							<BadgesFields
								jobsSuggestions={jobsSuggestions}
								setJobsSuggestions={(suggestions) => setJobsSuggestions(suggestions)}
								locationSuggestions={locationSuggestions}
								setLocationSuggestions={(suggestions) =>
									setLocationSuggestions(suggestions)
								}
							/>
						</section>
						{loggedUser.type === 'candidate' && (
							<section className="EditProfile__section">
								<h3 className="EditProfile__sectionTitle">Key abilities</h3>
								<KeyAbilitiesFields />
							</section>
						)}
						{loggedUser.type === 'candidate' && (
							<section className="EditProfile__sction">
								<h3 className="EditProfile__sectionTitle">Experience</h3>
								<ExperienceFields />
							</section>
						)}
					</div>
					{/* Right Side */}
					<div className="EditProfile__splitView--right">
						<div className="EditProfile__avatar">
							<div
								className="Profile__avatar"
								style={{
									backgroundImage: `url(${loggedUser.avatar})`,
								}}
							></div>
							<label className="btn btn-secondary mb-5">
								<input
									type="file"
									id="upload-button"
									onChange={handleChangeAvatar}
									style={{ display: 'none' }}
								/>
								Change Avatar
							</label>
						</div>
						{loggedUser.type === 'employer' && (
							<section className="EditProfile__section">
								<h3 className="EditProfile__sectionTitle">Available positions:</h3>
								<AvailablePositionsFields />
							</section>
						)}
						{loggedUser.type === 'candidate' && (
							<section className="EditProfile__section">
								<h3 className="EditProfile__sectionTitle">
									Projects / Achivements / Activities
								</h3>
								<ProjectsFields />
							</section>
						)}
						{loggedUser.type === 'candidate' && (
							<section className="EditProfile__section">
								<h3 className="EditProfile__sectionTitle">Useful links</h3>
								<UsefulLinksFields />
							</section>
						)}
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

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(ConnectedEditProfile);

export default EditProfile;
