import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Button from '../components/elements/Button';
import Input from '../components/elements/Input';
import isEmpty from '../components/isEmpty';
import Dropdown from 'react-dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

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
			updateLoggedField({ fieldName: 'status', fieldValue: loggedUser.status });
			if (loggedUser.description) {
				updateLoggedField({
					fieldName: 'description',
					fieldValue: loggedUser.description,
				});
			}
			if (loggedUser.job_title) {
				updateLoggedField({
					fieldName: 'job_title',
					fieldValue: loggedUser.job_title,
				});
			}
			if (loggedUser.city) {
				updateLoggedField({ fieldName: 'city', fieldValue: loggedUser.city });
			}
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
		}
	}, [formSubmitted]);

	// Modal
	const [openModal, setOpenModal] = useState(false);

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

	return (
		<>
			<div className="EditProfile__content">
				<div className="EditProfile__splitView">
					{/* Left Side */}
					<div className="EditProfile__splitView--left">
						<section className="EditProfile__section">
							<h3 className="EditProfile__sectionTitle">General Information</h3>
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
						</section>

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
