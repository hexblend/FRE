import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateHeaderView } from '../redux/actions/HeaderActions';
import { updateLoading } from '../redux/actions/index';
import isEmpty from '../components/isEmpty';

const mapStateToProps = (state) => ({
	loading: state.RootReducer.loading,
	loggedUser: state.AuthReducer.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
	updateLoading: (bool) => dispatch(updateLoading(bool)),
	updateHeaderView: (view) => dispatch(updateHeaderView(view)),
});

export const ConnectedEditProfile = (props) => {
	const {
		loading,
		updateLoading,
		loggedUser,
		updateHeaderView,
	} = props;

	const history = useHistory();

	// Loading
	useEffect(() => {
		if (!isEmpty(loggedUser)) {
			updateLoading(false);
		}
	}, [loggedUser, updateLoading]);

	// Check User IDs
	useEffect(() => {
		const paramID = props.match.params.id;
		if (!loading) {
			if (!isEmpty(loggedUser)) {
				if (loggedUser._id !== paramID) {
					history.goBack();
				}
			}
		}
	});

	// Update Header View
	useEffect(() => {
		if (!loading) {
			updateHeaderView('editProfile');
		}
	}, [updateHeaderView, loading]);

	return (
		<>
			{!loading && (
				<div>
					<h1>Edit profile</h1>
				</div>
			)}
		</>
	);
};

const EditProfile = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedEditProfile);

export default EditProfile;
