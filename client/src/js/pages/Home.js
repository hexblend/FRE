import React, { useState } from 'react';
// import List from '../components/List';
// import Form from '../components/Form';
// import Posts from '../components/Posts';

import HomeHeader from '../layout/HomeHeader';
import Button from '../components/Button';
import Link from '../components/Link';
import Input from '../components/Input';

function Home() {
	const [inputValue, setInputValue] = useState('');

	return (
		<div className="Home">
			<HomeHeader />
			<h2 className="mt-5 mb-4">Buttons</h2>
			<Button icon="check" type="secondary" text="Finish editing" wide={true} />
			<h2 className="mt-5 mb-4">Links</h2>
			<Link to="/about" text="Delete" type="red" border={true} icon="times" />
			<h2 className="mt-5 mb-4">{inputValue || 'Forms'}</h2>
			<Input
				id="name"
				type="text"
				label="Input label"
				placeholder="Placeholder..."
				value={inputValue}
				handleChange={setInputValue}
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
