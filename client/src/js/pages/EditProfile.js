import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { updateHeaderView } from '../redux/actions/HeaderActions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	updateHeaderView: (view) => dispatch(updateHeaderView(view)),
});

export const ConnectedEditProfile = (props) => {
	const { updateHeaderView } = props;

	useEffect(() => {
		updateHeaderView('editProfile');
	}, [updateHeaderView]);

	return (
		<div>
			<h1>Edit profile</h1>
		</div>
	);
};

const EditProfile = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedEditProfile);

export default EditProfile;
