import React from 'react';
// import List from '../components/List';
// import Form from '../components/Form';
// import Posts from '../components/Posts';

import HomeHeader from '../layout/HomeHeader';
import Button from '../components/elements/Button';

function Home() {
	return (
		<div className="Home">
			<HomeHeader />

			<div className="container">
				<div className="Home__alreadyMember">
					<h3>Already a member ?</h3>
					<div className="Home__alreadyMember--buttons">
						<Button text="Login as Candidate" />
						<Button text="Login as Employer" type="secondary" />
					</div>
				</div>

				<div className="Home__bigCard job">
					<img src="assets/images/handshake.jpg" alt="Handshake" />
					<div className="text-side">
						<h3>Looking for a job?</h3>
						<p>
							It’s that easy. Just create a profile as Candidate, upload all
							your information that is needed for an employer to make a good
							idea about you and sit tight! At any moment, somebody may pick
							your details and get in touch with you?
						</p>
						<Button text="Login as Employer" type="secondary" />
					</div>
				</div>

				<div className="Home__bigCard staff">
					<div className="text-side">
						<h3>Looking for a job?</h3>
						<p>
							It’s that easy. Just create a profile as Candidate, upload all
							your information that is needed for an employer to make a good
							idea about you and sit tight! At any moment, somebody may pick
							your details and get in touch with you?
						</p>
						<Button text="Login as Employer" type="secondary" />
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

export default Home;
