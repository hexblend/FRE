import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateHeaderView } from '../redux/actions/HeaderActions';

export const Messages = (props) => {
	const { updateHeaderView } = props;

	useEffect(() => {
		updateHeaderView('messages');
	}, [updateHeaderView]);

	return (
		<div>
			<h1>Id: {props.match.params.id}</h1>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	updateHeaderView: (str) => dispatch(updateHeaderView(str)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
