import React from 'react';
import { connect } from 'react-redux';

import Input from '../elements/Input';
import Link from '../elements/Link';
import DatePicker from 'react-datepicker';

import {
	updateLoggedObjField,
	deleteLoggedObj,
	addLoggedObj,
} from '../../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
});

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoggedObjField: (obj) => dispatch(updateLoggedObjField(obj)),
		deleteLoggedObj: (obj) => dispatch(deleteLoggedObj(obj)),
		addLoggedObj: (obj) => dispatch(addLoggedObj(obj)),
	};
};
function SingleExperience(props) {
	const {
		// Globals
		updateLoggedObjField,
		deleteLoggedObj,
		// Passed
		experience,
		index,
	} = props;

	return (
		<>
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
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleExperience);
