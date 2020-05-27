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
		project,
		index,
	} = props;

	return (
		<>
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
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleExperience);
