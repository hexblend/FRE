import React from 'react';
import Header from '../layout/Header';
import SearchResult from '../components/SearchResult';

function Search(props) {
	const headerContent = {
		resultsNo: 37,
		jobTitles: 'Web Developer, UX Designer',
		city: 'London',
	};

	const loggedIn = false;
	const profile = {
		name: 'Konstantin Ruhzev',
		jobTitle: 'Full-Stack Web Developer',
		city: 'Southampton',
		remoteWorker: true,
		yearsOfExperience: 1,
		higherEducation: true,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pharetra tincidunt sem. Fusce quis nisi libero. Donec libero enim, laoreet a mi ut, sollicitudin dignissim neque. Nunc iaculis magna quam, et commodo leo mollis sit amet. Integer efficitur sapien quam, a vestibulum enim consequat eu. Nunc vitae tortor pretium, hendrerit quam eget, molestie nulla. Vivamus viverra felis non eros convallis, vitae cursus nisi interdum. Pellentesque blandit blandit dolor ut congue. Phasellus nisl turpis, aliquam nec turpis vel, vehicula aliquam orci. Cras feugiat at eros nec sodales. Sed porta tellus arcu, vitae maximus lectus vehicula at. Phasellus consectetur, quam ut placerat efficitur, lectus tellus efficitur diam...',
	};

	return (
		<div className="Search">
			<Header type="search" content={headerContent} />
			<SearchResult profile={profile} loggedIn={loggedIn} />
		</div>
	);
}

export default Search;
