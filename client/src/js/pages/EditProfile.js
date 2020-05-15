import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../components/elements/Button';
import Input from '../components/elements/Input';
import isEmpty from '../components/isEmpty';

import { updateHeaderView } from '../redux/actions/HeaderActions';
import { updateLoading } from '../redux/actions/index';
import { updateLoggedProfile } from '../redux/actions/ProfileActions';

const mapStateToProps = (state) => ({
	loading: state.RootReducer.loading,
	loggedUser: state.AuthReducer.loggedUser,
	loggedProfile: state.ProfileReducer.loggedProfile,
});

const mapDispatchToProps = (dispatch) => ({
	updateLoading: (bool) => dispatch(updateLoading(bool)),
	updateHeaderView: (view) => dispatch(updateHeaderView(view)),
	updateLoggedProfile: (profile) => dispatch(updateLoggedProfile(profile)),
});

export const ConnectedEditProfile = (props) => {
	const {
		loading,
		updateLoading,
		loggedUser,
		updateHeaderView,
		loggedProfile,
		updateLoggedProfile,
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

	// Modal
	const [openModal, setOpenModal] = useState(false);

	const [fullName, setFullName] = useState('');
	const [fullNameError, setFullNameError] = useState('');

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	return (
		<>
			{!loading && (
				<div className="EditProfile__content">
					<div className="EditProfile__splitView">
						{/* Left Side */}
						<div className="EditProfile__splitView--left">
							<section className="EditProfile__section">
								<h3 className="EditProfile__section--title">
									General Information
								</h3>
								<Input
									type="text"
									id="fullName"
									label="Full name"
									placeholder="First and last name"
									minWidth="100%"
									value={fullName}
									handleChange={setFullName}
									error={fullNameError}
								/>
								<Input
									type="email"
									id="email"
									label="Your email"
									placeholder="Your email"
									minWidth="100%"
									value={email}
									handleChange={setEmail}
									error={emailError}
								/>
							</section>
							<h3 className="EditProfile__sectionTitle">Badges</h3>
							<h3 className="EditProfile__sectionTitle">Key abilities</h3>
							<h3 className="EditProfile__sectionTitle">Experience</h3>
						</div>
						{/* Right Side */}
						<div className="EditProfile__splitView--right">
							<h3 className="EditProfile__sectionTitle">
								Projects / Achivements / Activities
							</h3>
							<h3 className="EditProfile__sectionTitle">Useful links</h3>
						</div>
					</div>

					<div className="EditProfile__buttons">
						<div></div>
						<Button
							text="Delete profile"
							btnType="button"
							type="delete"
							onClick={() => setOpenModal(true)}
						/>
					</div>
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
