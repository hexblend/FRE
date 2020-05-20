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

	// Update updatedLoggedUser
	useEffect(() => {
		if (!isEmpty(loggedUser)) {
			const loadField = (fieldName, fieldValue) => {
				if (loggedUser[fieldName]) {
					updateLoggedField({ fieldName, fieldValue });
				}
			};
			// prettier-ignore
			loadField('full_name', loggedUser.full_name.first_name + ' ' + loggedUser.full_name.last_name);
			loadField('email', loggedUser.email);
			loadField('status', loggedUser.status);
			loadField('description', loggedUser.description);
			loadField('job_title', loggedUser.job_title);
			loadField('city', loggedUser.city);
			loadField('years_of_activity', loggedUser.years_of_activity);
			loadField('remote_worker', loggedUser.remote_worker);
			loadField('higher_education', loggedUser.higher_education);
			loadField('key_abilities', loggedUser.key_abilities);
			loadField('experience', loggedUser.experience);
			loadField('projects', loggedUser.projects);

			const loadKeyInObj = (object, key, value) => {
				if (loggedUser[object][key]) {
					updateLoggedKeyinObj({ object, key, value });
				}
			};
			loadKeyInObj('social_media', 'facebook', loggedUser.social_media.facebook);
			loadKeyInObj('social_media', 'twitter', loggedUser.social_media.twitter);
			loadKeyInObj('social_media', 'linkedin', loggedUser.social_media.linkedin);
			loadKeyInObj('social_media', 'instagram', loggedUser.social_media.instagram);
			loadKeyInObj('social_media', 'github', loggedUser.social_media.github);
			// prettier-ignore
			loadKeyInObj('social_media','personal_website',loggedUser.social_media.personal_website);
		}
	}, [loggedUser, updateLoggedField, updateLoggedKeyinObj]);

	// Validation
	useEffect(() => {
		if (updatedLoggedUser.formSubmitted) {
			setUpdateFormSubmitted(false);
			let valid = true;
			// Full name
			if (updatedLoggedUser.full_name === '') {
				updateLoggedFieldError({
					fieldName: 'full_name',
					error: 'Your full name must not be empty.',
				});
				valid = false;
			} else if (updatedLoggedUser.full_name.split(' ').length !== 2) {
				updateLoggedFieldError({
					fieldName: 'full_name',
					error: 'Your must include your first and last name.',
				});
				valid = false;
			} else {
				updateLoggedFieldError({ fieldName: 'full_name', error: '' });
			}
			// Email
			if (updatedLoggedUser.email === '') {
				updateLoggedFieldError({
					fieldName: 'email',
					error: "You can't leave your email empty.",
				});
				valid = false;
			} else if (!/\S+@\S+/.test(updatedLoggedUser.email.toLowerCase())) {
				updateLoggedFieldError({
					fieldName: 'email',
					error: 'You must enter a valid email type.',
				});
				valid = false;
			} else {
				updateLoggedFieldError({ fieldName: 'email', error: '' });
			}
			// Job Title
			const jobTitle = updatedLoggedUser.job_title;
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
			const cityName = updatedLoggedUser.city;
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
			const pattern = /^(0|([1-9]\d*))$/;
			if (!pattern.test(updatedLoggedUser.years_of_activity)) {
				updateLoggedFieldError({
					fieldName: 'years_of_activity',
					error: 'You must enter a valid number.',
				});
				valid = false;
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
			setAlert({ type: 'success', text: 'Profile updated.' });
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
						<section className="EditProfile__section">
							<h3 className="EditProfile__sectionTitle">Key abilities</h3>
							<KeyAbilitiesFields />
						</section>
						<section className="EditProfile__sction">
							<h3 className="EditProfile__sectionTitle">Experience</h3>
							<ExperienceFields />
						</section>
					</div>
					{/* Right Side */}
					<div className="EditProfile__splitView--right">
						<section className="EditProfile__section">
							<h3 className="EditProfile__sectionTitle">
								Projects / Achivements / Activities
							</h3>
							<ProjectsFields />
						</section>
						<section className="EditProfile__section">
							<h3 className="EditProfile__sectionTitle">Useful links</h3>
							<UsefulLinksFields />
						</section>
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
