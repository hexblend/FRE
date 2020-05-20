import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import SingleProject from './SingleProject';
import Button from '../elements/Button';

import { addLoggedObj } from '../../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
});

const mapDispatchToProps = (dispatch) => {
	return {
		addLoggedObj: (obj) => dispatch(addLoggedObj(obj)),
	};
};
function ExperienceFields(props) {
	const { updatedLoggedUser, addLoggedObj } = props;

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

	return (
		<>
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
				<SingleProject project={project} index={index} key={project._id} />
			))}
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(ExperienceFields);
