import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import Badges from '../components/Badges';
import Button from '../components/elements/Button';
import CustomLink from '../components/elements/Link';

// import isEmpty from '../components/isEmpty';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
});

const ConnectedProfile = (props) => {
	const history = useHistory();
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

	const [profile, setProfile] = React.useState({});

	useEffect(() => {
		const uid = props.match.params.id;
		const API_URL = process.env.REACT_APP_API_URL;
		axios
			.get(`${API_URL}/api/users/${uid}`)
			.then((res) => setProfile(res.data.user))
			.catch((err) => err && history.push(PUBLIC_URL));
	}, []);

	// Formating
	const fullName =
		profile.full_name &&
		profile.full_name.first_name + ' ' + profile.full_name.last_name;
	const firstName = profile.full_name && profile.full_name.first_name;
	return (
		<div className="Profile">
			<div className="Profile__header">
				<div className="Profile__header--left">
					{/* Full Name */}
					{profile.full_name && (
						<h1 className="Profile__fullName">{fullName}</h1>
					)}
					{/* Status */}
					{profile.status && (
						<p className="Profile__status">{profile.status}</p>
					)}
					{/* Badges */}
					<div className="Profile__badges">
						<Badges profile={profile} />
					</div>
				</div>
				<div className="Profile__header--right">
					<div
						className="Profile__avatar"
						style={{ backgroundImage: `url(${profile.avatar})` }}
					></div>
					<Link to="#">
						<Button
							text={`Message ${firstName}`}
							type="secondary"
							btnType="button"
						/>
					</Link>
				</div>
			</div>

			<div className="Profile__splitView">
				{/* Left side */}
				<div className="Profile__splitView--left">
					{/* Description */}
					{profile.description && (
						<div className="Profile__description">
							<h3 className="Profile__sectionTitle">Description: </h3>

							<p>{profile.description}</p>
						</div>
					)}
					{/* Key abilities */}
					{profile.key_abilities && (
						<div className="Profile__keyAbilities">
							<h3 className="Profile__sectionTitle">Key abilities: </h3>

							<ul>
								{profile.key_abilities.map((ability, index) => (
									<li key={index}>{ability}</li>
								))}
							</ul>
						</div>
					)}
					{/* Experience */}
					{profile.experience && (
						<div className="Profile__experience">
							<h3 className="Profile__sectionTitle">Experience: </h3>

							{profile.experience.map((exp) => (
								<div div className="Profile__experience--single" key={exp._id}>
									<p className="Profile__experience--jobTitle">
										{exp.job_title}
									</p>
									<p className="Profile__experience--companyName">
										{exp.company_name}
									</p>
									<div className="Profile__experience--date">
										<p className="Profile__experience--startingDate">
											{moment(exp.starting_date).format('MMM') +
												' ' +
												moment(exp.starting_date).format('YYYY')}
										</p>
										<p className="Profile__experience--endingDate">
											{moment(exp.ending_date).format('MMM') +
												' ' +
												moment(exp.ending_date).format('YYYY')}
										</p>
									</div>
									<p className="Profile__experinece--longDesc">
										{exp.long_description}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
				{/* Right side */}
				<div className="Profile__splitView--right">
					{/* Projects */}
					{profile.projects && (
						<div className="Profile__projects">
							<h3 className="Profile__sectionTitle">
								Projects / Achivements / Activities:{' '}
							</h3>

							{profile.projects.map((prj) => (
								<div div className="Profile__projects--single" key={prj._id}>
									<p className="Profile__projects--projectTitle">{prj.title}</p>
									{prj.description && (
										<>
											<p className="Profile__projects--subsectionTitle">
												Description
											</p>
											<p className="Profile__projects--projectDescription">
												{prj.description}
											</p>
										</>
									)}
									{prj.accomplishments && (
										<>
											<p className="Profile__projects--subsectionTitle">
												Accomplishments
											</p>
											<p className="Profile__projects--projectDescription">
												{prj.accomplishments}
											</p>
										</>
									)}
									{prj.link && (
										<div className="Profile__projects--link">
											<p className="Profile__projects--subsectionTitle">
												Link:
											</p>
											<CustomLink to={prj.link} text={prj.link} border={true} />
										</div>
									)}
								</div>
							))}
						</div>
					)}

					{/* Useful links */}
					<div className="Profile__links">
						<h3 className="Profile__sectionTitle">Useful Links:</h3>
						{/* Email */}
						<div className="Profile__links--link">
							<p>Email -</p>
							<CustomLink
								to={profile.email}
								text={profile.email}
								border={true}
							/>
						</div>
						{profile.social_media && (
							<>
								{/* Facebook */}
								{profile.social_media.facebook && (
									<div className="Profile__links--link">
										<p>Facebook -</p>
										<CustomLink
											to={profile.social_media.facebook}
											text={profile.social_media.facebook}
											border={true}
										/>
									</div>
								)}
								{/* Twitter */}
								{profile.social_media.twitter && (
									<div className="Profile__links--link">
										<p>Twitter -</p>
										<CustomLink
											to={profile.social_media.twitter}
											text={profile.social_media.twitter}
											border={true}
										/>
									</div>
								)}
								{/* Instagram */}
								{profile.social_media.instagram && (
									<div className="Profile__links--link">
										<p>Instagram -</p>
										<CustomLink
											to={profile.social_media.instagram}
											text={profile.social_media.instagram}
											border={true}
										/>
									</div>
								)}
								{/* LinkedIn */}
								{profile.social_media.linkedin && (
									<div className="Profile__links--link">
										<p>LinkedIn -</p>
										<CustomLink
											to={profile.social_media.linkedin}
											text={profile.social_media.linkedin}
											border={true}
										/>
									</div>
								)}
								{/* GitHub */}
								{profile.social_media.github && (
									<div className="Profile__links--link">
										<p>GitHub -</p>
										<CustomLink
											to={profile.social_media.github}
											text={profile.social_media.github}
											border={true}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</div>
				{/* Get in touch */}
				<div className="Profile__getInTouch">
					<h3 className="Profile__sectionTitle">Get in touch:</h3>
					<Link to="#">
						<Button
							text={`Message ${firstName}`}
							type="secondary"
							btnType="button"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

const Profile = connect(mapStateToProps)(ConnectedProfile);
export default Profile;
