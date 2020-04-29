import React from 'react';
import List from '../components/List';
import Form from '../components/Form';
import Posts from '../components/Posts';

import HomeHeader from '../layout/HomeHeader';
import Button from '../components/Button';

function Home() {
	return (
		<div className="Home">
			<HomeHeader />
			<Button icon="check" text="Finish editing" wide={true} />
			{/* <div>
				<h2>Articles</h2>
				<List />
			</div>
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
