import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../elements/Input';
import Button from '../../elements/Button';

function Search() {
	const [jobTitle, setJobTitle] = useState('');
	const [location, setLocation] = useState('');
	const PUBLIC_URL = process.env.PUBLIC_URL;

	return (
		<div className="homeHeader__search">
			<Input
				type="text"
				id="jobTitle"
				placeholder="Web developer, Graphic Designer"
				label="I'm looking for:"
				minWidth="350px"
				whiteLabel={true}
				value={jobTitle}
				handleChange={setJobTitle}
			/>
			<Input
				type="text"
				id="location"
				placeholder="London"
				label="In:"
				whiteLabel={true}
				value={location}
				handleChange={setLocation}
			/>
			<Link to={`${PUBLIC_URL}/search`}>
				<Button text="Search for candidates" />
			</Link>
		</div>
	);
}

export default Search;
