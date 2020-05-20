import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import SingleExperience from './SingleExperience';
import Button from '../elements/Button';

import { addLoggedObj } from '../../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
});

const mapDispatchToProps = (dispatch) => {
	return {
		addLoggedObj: (obj) => dispatch(addLoggedObj(obj)),
	};
};
function ExperienceFields(props) {
	const { loggedUser, updatedLoggedUser, addLoggedObj } = props;

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
	return (
		<>
			<Button
				btnType="button"
				type="full-width"
				icon="plus"
				minWidth="100%"
				noShadow={true}
				text="Add a new experience"
				onClick={addNewExperience}
			/>
			{loggedUser.experience &&
				loggedUser.experience.map((experience, index) => (
					<SingleExperience experience={experience} index={index} key={experience._id} />
				))}
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(ExperienceFields);
