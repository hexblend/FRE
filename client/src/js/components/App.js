import React from 'react';
import List from './List';
import Form from './Form';
import Posts from './Posts';

const App = () => (
	<div className="App">
		<div>
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
		</div>
	</div>
);

export default App;
