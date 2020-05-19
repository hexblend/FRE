import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';

import Button from '../components/elements/Button';
import Input from '../components/elements/Input';
import isEmpty from '../components/isEmpty';
import Link from '../components/elements/Link';
import ConfirmationModal from '../components/ConfirmationModal';
import Alert from '../layout/Alert';

import GeneralInformationFields from '../components/editProfilePage/GeneralInformationFields';
import BadgesFields from '../components/editProfilePage/BadgesFields';
import KeyAbilitiesFields from '../components/editProfilePage/KeyAbilitiesFields';
import UsefulLinksFields from '../components/editProfilePage/UsefulLinksFields';

import { updateHeaderView } from '../redux/actions/HeaderActions';
import {
	addLoggedUser,
	updateLoggedField,
	updateLoggedFieldError,
	updateLoggedObjField,
	updateLoggedObjFieldError,
	setUpdateFormSubmitted,
	updateLoggedKeyinObj,
	addLoggedObj,
	deleteLoggedObj,
} from '../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
	formSubmitted: state.AuthReducer.updatedLoggedUser.formSubmitted,
});

const mapDispatchToProps = (dispatch) => ({
	addLoggedUser: (user) => dispatch(addLoggedUser(user)),

	updateHeaderView: (view) => dispatch(updateHeaderView(view)),

	updateLoggedField: (obj) => dispatch(updateLoggedField(obj)),
	updateLoggedFieldError: (obj) => dispatch(updateLoggedFieldError(obj)),

	updateLoggedObjField: (obj) => dispatch(updateLoggedObjField(obj)),
	updateLoggedObjFieldError: (obj) => dispatch(updateLoggedObjFieldError(obj)),

	setUpdateFormSubmitted: (bool) => dispatch(setUpdateFormSubmitted(bool)),

	addLoggedObj: (obj) => dispatch(addLoggedObj(obj)),
	deleteLoggedObj: (obj) => dispatch(deleteLoggedObj(obj)),

	updateLoggedKeyinObj: (obj) => dispatch(updateLoggedKeyinObj(obj)),
});

export const ConnectedEditProfile = (props) => {
	const { updateHeaderView } = props;
	const {
		loggedUser,
		updatedLoggedUser,

		updateLoggedField,
		updateLoggedFieldError,

		updateLoggedObjField,

		addLoggedObj,
		deleteLoggedObj,

		updateLoggedKeyinObj,

		formSubmitted,
		setUpdateFormSubmitted,
	} = props;

	const history = useHistory();
	const API_URL = process.env.REACT_APP_API_URL;

	const [jobsSuggestions, setJobsSuggestions] = useState([]);
	const [locationSuggestions, setLocationSuggestions] = useState([]);

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
					error: 'You must enter a valid email type.',
				});
			} else {
				updateLoggedFieldError({ fieldName: 'email', error: '' });
			}

			// Job Title
			if (updatedLoggedUser.job_title) {
				const jobTitle = updatedLoggedUser.job_title;
				const words = jobTitle.split(' ');
				words.forEach((word) => {
					if (word[0] !== word[0].toUpperCase()) {
						updateLoggedFieldError({
							fieldName: 'job_title',
							error: 'You must select a valid job title.',
						});
						setJobsSuggestions([]);
					} else {
						updateLoggedFieldError({ fieldName: 'job_title', error: '' });
					}
				});
			}

			// Location
			if (updatedLoggedUser.city) {
				const cityName = updatedLoggedUser.city;
				const words = cityName.split(' ');
				words.forEach((word) => {
					if (word[0] !== word[0].toUpperCase()) {
						updateLoggedFieldError({
							fieldName: 'city',
							error: 'Please select a location from the list.',
						});
						setLocationSuggestions([]);
					} else {
						updateLoggedFieldError({ fieldName: 'city', error: '' });
						setLocationSuggestions([]);
					}
				});
			}
			// Years of activity
			if (updatedLoggedUser.years_of_activity) {
				const pattern = /^(0|([1-9]\d*))$/;
				if (!pattern.test(updatedLoggedUser.years_of_activity)) {
					updateLoggedFieldError({
						fieldName: 'years_of_activity',
						error: 'You must enter a valid number.',
					});
				} else {
					updateLoggedFieldError({ fieldName: 'years_of_activity', error: '' });
				}
			}
		}
	}, [formSubmitted]);

	// Experience
	const addNewExperience = () => {
		addLoggedObj({
			array: 'experience',
			object: {
				_id: uuidv4(),
				company_name: '',
				job_title: '',
				starting_date: new Date(),
				ending_date: new Date(),
				long_description: '',
			},
		});
	};

	// Projects
	const addNewProject = () => {
		addLoggedObj({
			array: 'projects',
			object: {
				_id: uuidv4(),
				title: '',
				description: '',
				accomplishments: '',
				link: '',
			},
		});
	};

	// Modal
	const [openModal, setOpenModal] = useState(false);
	// Alert
	const [alert, setAlert] = useState('');

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
							{/* Key abilities */}
							<h3 className="EditProfile__sectionTitle">Key abilities</h3>
							<KeyAbilitiesFields />
						</section>

						{/* Experience */}
						<h3 className="EditProfile__sectionTitle">Experience</h3>
						<Button
							btnType="button"
							type="full-width"
							icon="plus"
							minWidth="100%"
							noShadow={true}
							text="Add a new experience"
							onClick={addNewExperience}
						/>
						{updatedLoggedUser.experience.map((experience, index) => (
							<div className="EditProfile__experience" key={experience._id}>
								<div className="EditProfile__experience--header">
									<p>{index + 1}:</p>
									<Link
										type="red"
										to="#"
										icon="times"
										iconSide="right"
										text="Delete"
										border={true}
										onClick={() => deleteLoggedObj({ array: 'experience', index })}
									/>
								</div>
								<Input
									type="text"
									id={`job_title_${experience._id}`}
									label="Job Title"
									placeholder="Your job title"
									minWidth="100%"
									value={experience.job_title}
									handleChange={(job_title) =>
										updateLoggedObjField({
											array: 'experience',
											id: experience._id,
											fieldName: 'job_title',
											fieldValue: job_title,
										})
									}
								/>
								<Input
									type="text"
									id={`company_name_${experience._id}`}
									label="Company name"
									placeholder="Company name"
									minWidth="100%"
									value={experience.company_name}
									handleChange={(company_name) =>
										updateLoggedObjField({
											array: 'experince',
											id: experience._id,
											fieldName: 'company_name',
											fieldValue: company_name,
										})
									}
								/>
								<div className="EditProfile__experience--date">
									<div>
										<p className="customLabel">Starting date:</p>
										<DatePicker
											selected={new Date(experience.starting_date)}
											onChange={(date) => {
												updateLoggedObjField({
													array: 'experience',
													id: experience._id,
													fieldName: 'starting_date',
													fieldValue: date,
												});
											}}
											dateFormat="MM/yyyy"
											className="customInput"
										/>
									</div>
									<div>
										<p className="customLabel">Ending date:</p>
										<DatePicker
											selected={new Date(experience.ending_date)}
											onChange={(date) => {
												updateLoggedObjField({
													array: 'experience',
													id: experience._id,
													fieldName: 'ending_date',
													fieldValue: date,
												});
											}}
											dateFormat="MM/yyyy"
											className="customInput"
										/>
									</div>
								</div>
								<Input
									type="textarea"
									id={`long_description_${experience._id}`}
									label="Description"
									placeholder="Job duties, responsabilities, etc."
									minWidth="100%"
									value={experience.long_description}
									handleChange={(long_description) =>
										updateLoggedObjField({
											array: 'experience',
											id: experience._id,
											fieldName: 'long_description',
											fieldValue: long_description,
										})
									}
								/>
							</div>
						))}
					</div>
					{/* Right Side */}
					<div className="EditProfile__splitView--right">
						<section className="EditProfile__section">
							<h3 className="EditProfile__sectionTitle">
								Projects / Achivements / Activities
							</h3>
							<Button
								btnType="button"
								type="full-width"
								icon="plus"
								minWidth="100%"
								noShadow={true}
								text="Add a new project"
								onClick={addNewProject}
							/>
							{updatedLoggedUser.projects.map((project, index) => (
								<div className="EditProfile__experience" key={project._id}>
									<div className="EditProfile__experience--header">
										<p>{index + 1}:</p>
										<Link
											type="red"
											to="#"
											icon="times"
											iconSide="right"
											text="Delete"
											border={true}
											onClick={() => deleteLoggedObj({ array: 'projects', index })}
										/>
									</div>
									{/* Project title */}
									<Input
										type="text"
										id={`project_title_${project._id}`}
										label="Project title"
										placeholder="Your project title"
										minWidth="100%"
										value={project.title}
										handleChange={(title) =>
											updateLoggedObjField({
												array: 'projects',
												id: project._id,
												fieldName: 'title',
												fieldValue: title,
											})
										}
									/>
									{/* Project description */}
									<Input
										type="textarea"
										id={`project_description_${project._id}`}
										label="Project description"
										placeholder="Your project description"
										minWidth="100%"
										value={project.description}
										handleChange={(description) =>
											updateLoggedObjField({
												array: 'projects',
												id: project._id,
												fieldName: 'description',
												fieldValue: description,
											})
										}
									/>
									{/* Project accomplishments */}
									<Input
										type="textarea"
										id={`project_accomplishments_${project._id}`}
										label="Project accomplishments"
										placeholder="Your project accomplishments"
										minWidth="100%"
										value={project.accomplishments}
										handleChange={(accomplishments) =>
											updateLoggedObjField({
												array: 'projects',
												id: project._id,
												fieldName: 'accomplishments',
												fieldValue: accomplishments,
											})
										}
									/>
									{/* Project Link */}
									<Input
										type="text"
										id={`project_link_${project._id}`}
										label="Project link"
										placeholder="Your project link"
										minWidth="100%"
										value={project.link}
										handleChange={(link) =>
											updateLoggedObjField({
												array: 'projects',
												id: project._id,
												fieldName: 'link',
												fieldValue: link,
											})
										}
									/>
								</div>
							))}
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
