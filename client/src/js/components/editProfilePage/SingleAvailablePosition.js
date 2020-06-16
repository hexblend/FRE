import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Input from '../elements/Input';
import Link from '../elements/Link';
import Dropdown from 'react-dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import {
	updateLoggedObjField,
	deleteLoggedObj,
	addLoggedObj,
} from '../../redux/actions/AuthActions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoggedObjField: (obj) =>
			dispatch(updateLoggedObjField(obj)),
		deleteLoggedObj: (obj) =>
			dispatch(deleteLoggedObj(obj)),
		addLoggedObj: (obj) => dispatch(addLoggedObj(obj)),
	};
};
function SingleExperience(props) {
	const {
		// Globals
		updateLoggedObjField,
		deleteLoggedObj,
		// Passed
		position,
		index,
	} = props;

	const typeOfWorkerOptions = [
		{ label: 'Any', value: 'any' },
		{ label: 'Office worker', value: 'office' },
		{ label: 'Remote worker', value: 'remote' },
	];

	const [jobsSuggestions, setJobsSuggestions] = useState(
		[]
	);
	const [typingTimeout, setTypingTimeout] = useState(0);

	// Jobs
	const getJobSuggestions = (query) => {
		updateLoggedObjField({
			array: 'available_positions',
			id: position._id,
			fieldName: 'job_title',
			fieldValue: query,
		});
		if (typingTimeout) clearTimeout(typingTimeout);
		setTypingTimeout(
			setTimeout(() => {
				axios
					.post(
						`${API_URL}/api/by-pass-api`,
						{
							url: `http://api.dataatwork.org/v1/jobs/autocomplete?contains=${tagsInput}`,
						},
						{ withCredentials: true }
					)
					.then((res) =>
						setJobsSuggestions(
							res.data.slice(0, 4).reverse()
						)
					);
			}, 500)
		);
	};

	return (
		<>
			<div
				className="EditProfile__experience"
				key={position._id}
			>
				<div className="EditProfile__experience--header">
					<p>{index + 1}:</p>
					<Link
						type="red"
						to="#"
						icon="times"
						iconSide="right"
						text="Delete"
						border={true}
						onClick={() =>
							deleteLoggedObj({
								array: 'available_positions',
								index,
							})
						}
					/>
				</div>
				{/* Position job title */}
				<Input
					type="text"
					id="positionJobTitle"
					label="Job title"
					placeholder="Your position job title"
					minWidth="100%"
					value={position.job_title}
					handleChange={(jobTitle) =>
						getJobSuggestions(jobTitle)
					}
				/>
				{/* Poistion Jobs Suggestions */}
				<ul
					className="Suggestions EditProfile__suggestions mb-4"
					style={{ width: `100%`, top: '5.85rem' }}
				>
					{jobsSuggestions.map((suggestion) => (
						<li
							key={suggestion.uuid}
							onClick={() => {
								updateLoggedObjField({
									array: 'available_positions',
									id: position._id,
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
				{/* Type of worker */}
				<p className="EditProfile__section--label">
					Type of worker
				</p>
				<Dropdown
					value={position.type_of_worker}
					onChange={(option) =>
						updateLoggedObjField({
							array: 'available_positions',
							id: position._id,
							fieldName: 'type_of_worker',
							fieldValue: option.value,
						})
					}
					options={typeOfWorkerOptions}
					controlClassName="EditProfile__statusDropdown"
					placeholderClassName="EditProfile__statusDropdown--placeholder EditProfile_typeOfWorkerDropdow--placeholder"
					menuClassName="EditProfile__statusDropdown--menu"
					arrowClosed={
						<FontAwesomeIcon icon={faCaretDown} />
					}
					arrowOpen={<FontAwesomeIcon icon={faCaretDown} />}
				/>
				{/* Years of experience */}
				<Input
					type="text"
					id="positionYearsOfExperience"
					label="Years of experience"
					placeholder="Career length"
					minWidth="100%"
					value={position.years_of_experience}
					handleChange={(years) =>
						updateLoggedObjField({
							array: 'available_positions',
							id: position._id,
							fieldName: 'years_of_experience',
							fieldValue: years,
						})
					}
					icon="calendar-alt"
				/>
				{/* Abilities */}
				<Input
					type="textarea"
					id={`position_abilities_${position._id}`}
					label="Abilities"
					placeholder="Position required skills"
					minWidth="100%"
					value={position.skills}
					handleChange={(skills) =>
						updateLoggedObjField({
							array: 'available_positions',
							id: position._id,
							fieldName: 'skills',
							fieldValue: skills,
						})
					}
				/>
				{/* Benefits */}
				<Input
					type="textarea"
					id={`position_benefits_${position._id}`}
					label="Benefits"
					placeholder="Your offered benefits"
					minWidth="100%"
					value={position.benefits}
					handleChange={(benefits) =>
						updateLoggedObjField({
							array: 'available_positions',
							id: position._id,
							fieldName: 'benefits',
							fieldValue: benefits,
						})
					}
				/>
			</div>
		</>
	);
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleExperience);
