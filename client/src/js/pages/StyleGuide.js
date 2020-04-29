import React, { useState } from 'react';

import Button from '../components/elements/Button';
import Link from '../components/elements/Link';
import Input from '../components/elements/Input';
import Tag from '../components/elements/Tag';

function StyleGuide() {
	const [inputValue, setInputValue] = useState('');

	return (
		<div>
			<h1>Style Guide</h1>
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

			<h2 className="mt-5 mb-4">Tag</h2>
			<Tag content="HTML" />

			<h2 className="mt-5 mb-4">Checkmark</h2>
		</div>
	);
}

export default StyleGuide;
