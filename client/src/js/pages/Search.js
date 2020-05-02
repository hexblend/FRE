import React from 'react';
import Header from '../layout/Header';

function Search(props) {
	const headerContent = {
		resultsNo: 37,
		jobTitles: 'Web Developer, UX Designer',
		city: 'London',
	};
	return (
		<div className="Search">
			<Header type="search" content={headerContent} />
		</div>
	);
}

export default Search;
