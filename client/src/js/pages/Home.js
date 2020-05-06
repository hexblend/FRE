import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeHeader from '../layout/HomeHeader';
import Button from '../components/elements/Button';

const mapStateToProps = (state) => ({ loggedUser: state.loggedUser });

function ConnectedHome({ loggedUser }) {
	const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
	return (
		<div className="Home">
			<HomeHeader />
			<div className="container">
				{!loggedUser._id && (
					<div className="Home__alreadyMember">
						<h3>Already a member ?</h3>
						<div className="Home__alreadyMember--buttons">
							<Link to={`${PUBLIC_URL}/candidate/login`}>
								<Button text="Login as Candidate" />
							</Link>
							<Link to={`${PUBLIC_URL}/employer/login`}>
								<Button text="Login as Employer" type="secondary" />
							</Link>
						</div>
					</div>
				)}

				<div className="Home__bigCard job">
					<img src="assets/images/handshake.jpg" alt="Handshake" />
					<div className="text-side">
						<h3>Looking for a job?</h3>
						<p>
							It’s that easy. Just create a profile as Candidate, upload all
							your information that is needed for an employer to make a good
							idea about you and sit tight! At any moment, somebody may pick
							your details and get in touch with you.
						</p>
						{!loggedUser._id && (
							<Link to={`${PUBLIC_URL}/candidate/register`}>
								<Button text="Register as Candidate" type="secondary" />
							</Link>
						)}
					</div>
				</div>

				<div className="Home__bigCard staff">
					<div className="text-side">
						<h3>Looking for a staff?</h3>
						<p>
							If you are an employer, you have the possibility to search through
							a list of candidates and pick the right one for your needs. It’s
							so simple that you don’t even need an account to do all this. It’s
							all right here, just search by job title and location. Oh, and you
							can even look for multiple job titles at the same time.
						</p>
						{!loggedUser._id && (
							<Link to={`${PUBLIC_URL}/employer/register`}>
								<Button text="Register as Employer" type="secondary" />
							</Link>
						)}
					</div>
					<img src="assets/images/empty_office.jpg" alt="Empty office" />
				</div>
			</div>
			{/* <div>
				<h2>Articles</h2>
				<List />
				</div>b
				<div>
					<h2>Add new article</h2> 
					<Form />
				</div>
				<div>
					<h2>API Posts</h2>
					<Posts />
				</div> */}
		</div>
	);
}
const Home = connect(mapStateToProps, null)(ConnectedHome);
export default Home;
