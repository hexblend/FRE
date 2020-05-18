import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';

import Button from '../components/elements/Button';
import Input from '../components/elements/Input';
import isEmpty from '../components/isEmpty';
import Dropdown from 'react-dropdown';
import Checkbox from '../components/elements/Checkbox';
import Link from '../components/elements/Link';
import ConfirmationModal from '../components/ConfirmationModal';
import Alert from '../layout/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';

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
	// Jobs
	const [typingTimeout, setTypingTimeout] = useState(0);
	const [jobsSuggestions, setJobsSuggestions] = useState([]);
	const getJobSuggestions = (query) => {
		updateLoggedField({
			fieldName: 'job_title',
			fieldValue: query,
		});
		if (typingTimeout) clearTimeout(typingTimeout);
		setTypingTimeout(
			setTimeout(() => {
				axios
					.get(
						`http://api.dataatwork.org/v1/jobs/autocomplete?contains=${updatedLoggedUser.job_title}`
					)
					.then((res) => setJobsSuggestions(res.data.slice(0, 4).reverse()));
			}, 500)
		);
	};
	// Locations
	const [locationSuggestions, setLocationSuggestions] = useState([]);
	const getLocationSuggestions = (query) => {
		updateLoggedField({ fieldName: 'city', fieldValue: query });
		if (typingTimeout) clearTimeout(typingTimeout);
		setTypingTimeout(
			setTimeout(() => {
				axios
					.get(`https://api.postcodes.io/places?q=${updatedLoggedUser.city}`)
					.then((res) => setLocationSuggestions(res.data.result.slice(0, 4)));
			}, 500)
		);
	};

	// Key abilities
	const [tagsLeft, setTagsLeft] = useState(0);
	useEffect(() => {
		setTagsLeft(12 - updatedLoggedUser.key_abilities.length);
	}, [updatedLoggedUser]);
	const [tagsInput, setTagsInput] = useState('');
	const addTag = (e) => {
		if (e.key === 'Enter') {
			setTagsInput('');
			if (tagsLeft > 0) {
				updateLoggedField({
					fieldName: 'key_abilities',
					fieldValue: [...updatedLoggedUser.key_abilities, e.target.value],
				});
				setTagsLeft(tagsLeft - 1);
			}
		}
	};
	const removeTag = (index) => {
		const tags = updatedLoggedUser.key_abilities;
		const remainedTags = tags.filter((tag) => tags.indexOf(tag) !== index);
		updateLoggedField({ fieldName: 'key_abilities', fieldValue: remainedTags });
		setTagsLeft(tagsLeft + 1);
	};

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
							{!isEmpty(updatedLoggedUser) && (
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
							)}
						</section>

						<section className="EditProfile__section">
							<h3 className="EditProfile__sectionTitle">Badges</h3>
							{/* Job Title Input */}
							<Input
								type="text"
								id="jobTitle"
								label="Desired job title"
								placeholder="Job Title"
								minWidth="100%"
								value={updatedLoggedUser.job_title}
								handleChange={(jobTitle) => getJobSuggestions(jobTitle)}
								error={updatedLoggedUser.errors.job_title}
								icon="suitcase"
							/>
							{/* Jobs Suggestions */}
							<ul
								className="Suggestions EditProfile__suggestions"
								style={{ width: `100%`, top: '5.85rem' }}
							>
								{jobsSuggestions.map((suggestion) => (
									<li
										key={suggestion.uuid}
										onClick={() => {
											updateLoggedField({
												fieldName: 'job_title',
												fieldValue: suggestion.suggestion,
											});
											setJobsSuggestions([]);
										}}
										className="Suggestions__suggestion"
									>
										{suggestion.suggestion}
									</li>
								))}
							</ul>
							{/* Location Input */}
							<Input
								type="text"
								id="city"
								label="Your city"
								placeholder="City name"
								minWidth="100%"
								value={updatedLoggedUser.city}
								handleChange={(city) => getLocationSuggestions(city)}
								error={updatedLoggedUser.errors.city}
								icon="map-marker-alt"
							/>
							{/* Locations Suggestions */}
							<ul
								className="Suggestions EditProfile__suggestions"
								style={{ width: `100%`, top: '5.85rem' }}
							>
								{locationSuggestions.map((suggestion) => (
									<li
										key={suggestion.uuid}
										onClick={() => {
											updateLoggedField({
												fieldName: 'city',
												fieldValue: suggestion.name_1,
											});
											setLocationSuggestions([]);
										}}
										className="Suggestions__suggestion"
									>
										{suggestion.name_1}
									</li>
								))}
							</ul>
							{/* Years of activity */}
							<Input
								type="text"
								id="years_of_activity"
								label="Years of activity"
								placeholder="Career duration"
								minWidth="100%"
								value={`${updatedLoggedUser.years_of_activity}`}
								handleChange={(years) =>
									updateLoggedField({
										fieldName: 'years_of_activity',
										fieldValue: years,
									})
								}
								error={updatedLoggedUser.errors.years_of_activity}
								icon="calendar-alt"
							/>
							{/* Remote Worker */}
							<Checkbox
								label="Keen to work remotely?"
								checked={updatedLoggedUser.remote_worker}
								setChecked={(checked) =>
									updateLoggedField({
										fieldName: 'remote_worker',
										fieldValue: checked,
									})
								}
								textChecked="Available to work from home"
								textUnchecked="Not available to work from home"
							/>
							{/* Higher education */}
							<Checkbox
								label="Higher education?"
								checked={updatedLoggedUser.higher_education}
								setChecked={(checked) =>
									updateLoggedField({
										fieldName: 'higher_education',
										fieldValue: checked,
									})
								}
								textChecked="I do have a higher education"
								textUnchecked="I do not have a higher education"
							/>
						</section>

						<section className="EditProfile__section">
							{/* Key abilities */}
							<h3 className="EditProfile__sectionTitle">Key abilities</h3>
							{/* Label */}
							<label htmlFor="key_abilities" className="customLabel">
								You can add {tagsLeft} more
								{tagsLeft === 1 ? ' ability' : ' abilities'}.
							</label>
							{/* Input */}
							<input
								type="text"
								id="key_abilities"
								name="key_abilities"
								autoComplete="off"
								placeholder="Add skill"
								className="customInput"
								style={{
									minWidth: `100%`,
									marginTop: '1.6rem',
								}}
								value={tagsInput}
								onChange={(e) => setTagsInput(e.target.value)}
								onKeyPress={addTag}
								readOnly={tagsLeft === 0 ? true : false}
							/>
							{/* Tags */}
							<ul className="Tags EditProfile__skillsTags">
								{updatedLoggedUser.key_abilities.map((tag, index) => (
									<li className="tag" key={index}>
										<span className="tag__text">{tag}</span>
										<span className="tag__icon" onClick={() => removeTag(index)}>
											<FontAwesomeIcon icon={faTimes} />
										</span>
									</li>
								))}
							</ul>
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
							{/* Facebook */}
							<Input
								type="text"
								id={`facebook_link`}
								label="Facebook:"
								placeholder="Facebook profile link"
								minWidth="100%"
								value={updatedLoggedUser.social_media.facebook}
								handleChange={(url) =>
									updateLoggedKeyinObj({
										object: 'social_media',
										key: 'facebook',
										value: url,
									})
								}
							/>
							{/* Twitter */}
							<Input
								type="text"
								id={`twitter_link`}
								label="Twitter:"
								placeholder="Twitter profile link"
								minWidth="100%"
								value={updatedLoggedUser.social_media.twitter}
								handleChange={(url) =>
									updateLoggedKeyinObj({
										object: 'social_media',
										key: 'twitter',
										value: url,
									})
								}
							/>
							{/* LinkedIn */}
							<Input
								type="text"
								id={`linkedin_link`}
								label="LinkedIn:"
								placeholder="LinkedIn profile link"
								minWidth="100%"
								value={updatedLoggedUser.social_media.linkedin}
								handleChange={(url) =>
									updateLoggedKeyinObj({
										object: 'social_media',
										key: 'linkedin',
										value: url,
									})
								}
							/>
							{/* Instagram */}
							<Input
								type="text"
								id={`instagram_link`}
								label="Instagram:"
								placeholder="Instagram profile link"
								minWidth="100%"
								value={updatedLoggedUser.social_media.instagram}
								handleChange={(url) =>
									updateLoggedKeyinObj({
										object: 'social_media',
										key: 'instagram',
										value: url,
									})
								}
							/>
							{/* GitHub */}
							<Input
								type="text"
								id={`github_link`}
								label="GitHub:"
								placeholder="GitHub profile link"
								minWidth="100%"
								value={updatedLoggedUser.social_media.github}
								handleChange={(url) =>
									updateLoggedKeyinObj({
										object: 'social_media',
										key: 'github',
										value: url,
									})
								}
							/>
							{/* Behance */}
							<Input
								type="text"
								id={`behance_link`}
								label="Behance:"
								placeholder="Behance profile link"
								minWidth="100%"
								value={updatedLoggedUser.social_media.behance}
								handleChange={(url) =>
									updateLoggedKeyinObj({
										object: 'social_media',
										key: 'behance',
										value: url,
									})
								}
							/>
							{/* Personal Website */}
							<Input
								type="text"
								id={`personal_website_link`}
								label="Personal website:"
								placeholder="Personal website link"
								minWidth="100%"
								value={updatedLoggedUser.social_media.personal_website}
								handleChange={(url) =>
									updateLoggedKeyinObj({
										object: 'social_media',
										key: 'personal_website',
										value: url,
									})
								}
							/>
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
