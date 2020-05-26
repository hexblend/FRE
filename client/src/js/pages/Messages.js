import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateHeaderView } from '../redux/actions/HeaderActions';

export const Messages = (props) => {
	const { updateHeaderView, messages, loggedUser } = props;

	useEffect(() => {
		updateHeaderView('messages');
	}, [updateHeaderView]);

	return (
		<div>
			{messages.map((message) => (
				<div
					className={`SingleMessage ${
						message.from === loggedUser._id && 'SingleMessage--sent'
					}`}
				>
					<p className="SingleMessage__text">{message.body}</p>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	messages: state.MessagesReducer.messages,
	loggedUser: state.AuthReducer.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
	updateHeaderView: (str) => dispatch(updateHeaderView(str)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
