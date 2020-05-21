import React from 'react';
import { connect } from 'react-redux';

import Input from '../elements/Input';
import Link from '../elements/Link';

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
		position,
		index,
	} = props;

	return (
		<>
			<div className="EditProfile__experience" key={position._id}>
				<div className="EditProfile__experience--header">
					<p>{index + 1}:</p>
					<Link
						type="red"
						to="#"
						icon="times"
						iconSide="right"
						text="Delete"
						border={true}
						onClick={() => deleteLoggedObj({ array: 'available_positions', index })}
					/>
				</div>
				{/* Position job title */}
				<Input
					type="text"
					id={`position_job_title_${position._id}`}
					label="Job title"
					placeholder="Your position job title"
					minWidth="100%"
					value={position.title}
					handleChange={(jobTitle) =>
						updateLoggedObjField({
							array: 'available_positions',
							id: position._id,
							fieldName: 'job_title',
							fieldValue: jobTitle,
						})
					}
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
export default connect(mapStateToProps, mapDispatchToProps)(SingleExperience);
