import React from 'react';
import { connect } from 'react-redux';

import SingleAvailablePosition from './SingleAvailablePosition';
import Button from '../elements/Button';

import { addLoggedObj } from '../../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
	loggedUser: state.AuthReducer.loggedUser,
});

const mapDispatchToProps = (dispatch) => {
	return {
		addLoggedObj: (obj) => dispatch(addLoggedObj(obj)),
	};
};
function AvailablePositionsFields(props) {
	const { loggedUser, updatedLoggedUser, addLoggedObj } = props;

	const addNewPosition = () => {
		addLoggedObj({
			array: 'available_positions',
			object: {
				job_title: '',
				type_of_worker: '',
				years_of_experience: '',
				skills: '',
				benefits: '',
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
				text="Add a new position"
				onClick={addNewPosition}
			/>
			{loggedUser.available_positions &&
				loggedUser.available_positions.map((position, index) => (
					<SingleAvailablePosition position={position} index={index} key={position._id} />
				))}
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(AvailablePositionsFields);
