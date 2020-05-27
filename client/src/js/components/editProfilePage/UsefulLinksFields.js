import React from 'react';
import { connect } from 'react-redux';

import Input from '../elements/Input';

import { updateLoggedKeyinObj } from '../../redux/actions/AuthActions';

const mapStateToProps = (state) => ({
	updatedLoggedUser: state.AuthReducer.updatedLoggedUser,
	loggedUser: state.AuthReducer.loggedUser,
});

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoggedKeyinObj: (obj) => dispatch(updateLoggedKeyinObj(obj)),
	};
};
function UsefulLinksFields(props) {
	const { loggedUser, updatedLoggedUser, updateLoggedKeyinObj } = props;
	let facebook, twitter, instagram, linkedin, github, behance, personal_website;
	if (loggedUser.social_media) {
		facebook = loggedUser.social_media.facebook;
		twitter = loggedUser.social_media.twitter;
		instagram = loggedUser.social_media.instagram;
		linkedin = loggedUser.social_media.linkedin;
		github = loggedUser.social_media.github;
		behance = loggedUser.social_media.behance;
		personal_website = loggedUser.social_media.personal_website;
	}
	return (
		<>
			{/* Facebook */}
			<Input
				type="text"
				id={`facebook_link`}
				label="Facebook:"
				placeholder="Facebook profile link"
				minWidth="100%"
				value={facebook && facebook}
				handleChange={(url) =>
					updateLoggedKeyinObj({
						object: 'social_media',
						key: 'facebook',
						value: url,
					})
				}
			/>
			{/* Twitter */}
			<Input
				type="text"
				id={`twitter_link`}
				label="Twitter:"
				placeholder="Twitter profile link"
				minWidth="100%"
				value={twitter && twitter}
				handleChange={(url) =>
					updateLoggedKeyinObj({
						object: 'social_media',
						key: 'twitter',
						value: url,
					})
				}
			/>
			{/* LinkedIn */}
			<Input
				type="text"
				id={`linkedin_link`}
				label="LinkedIn:"
				placeholder="LinkedIn profile link"
				minWidth="100%"
				value={linkedin && linkedin}
				handleChange={(url) =>
					updateLoggedKeyinObj({
						object: 'social_media',
						key: 'linkedin',
						value: url,
					})
				}
			/>
			{/* Instagram */}
			<Input
				type="text"
				id={`instagram_link`}
				label="Instagram:"
				placeholder="Instagram profile link"
				minWidth="100%"
				value={instagram && instagram}
				handleChange={(url) =>
					updateLoggedKeyinObj({
						object: 'social_media',
						key: 'instagram',
						value: url,
					})
				}
			/>
			{/* GitHub */}
			<Input
				type="text"
				id={`github_link`}
				label="GitHub:"
				placeholder="GitHub profile link"
				minWidth="100%"
				value={github && github}
				handleChange={(url) =>
					updateLoggedKeyinObj({
						object: 'social_media',
						key: 'github',
						value: url,
					})
				}
			/>
			{/* Behance */}
			<Input
				type="text"
				id={`behance_link`}
				label="Behance:"
				placeholder="Behance profile link"
				minWidth="100%"
				value={behance && behance}
				handleChange={(url) =>
					updateLoggedKeyinObj({
						object: 'social_media',
						key: 'behance',
						value: url,
					})
				}
			/>
			{/* Personal Website */}
			<Input
				type="text"
				id={`personal_website_link`}
				label="Personal website:"
				placeholder="Personal website link"
				minWidth="100%"
				value={personal_website && personal_website}
				handleChange={(url) =>
					updateLoggedKeyinObj({
						object: 'social_media',
						key: 'personal_website',
						value: url,
					})
				}
			/>
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(UsefulLinksFields);
