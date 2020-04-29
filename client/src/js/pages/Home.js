import React from 'react';
// import List from '../components/List';
// import Form from '../components/Form';
// import Posts from '../components/Posts';

import HomeHeader from '../layout/HomeHeader';
import Button from '../components/Button';
import Link from '../components/Link';

function Home() {
	return (
		<div className="Home">
			<HomeHeader />
			<h2>Buttons</h2>
			<Button
				icon="check"
				type="secondary"
				text="Finish editing"
				wide={true}
			/>
			<h2>Links</h2>
			<Link
				to="/about"
				text="Delete"
				type="red"
				border={true}
				icon="times"
			/>
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
