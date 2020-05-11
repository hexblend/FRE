import React, { useEffect } from 'react';
import querySearch from 'stringquery';
import axios from 'axios';

import Header from '../layout/Header';
import SearchResult from '../components/SearchResult';
import Sidebar from '../components/Sidebar';
import AuthNavbar from '../components/AuthNavbar';
import isEmpty from '../components/isEmpty';

import { connect } from 'react-redux';
import { updateSearchResults } from '../redux/actions/SearchActions';

const mapStateToProps = (state) => ({
	loggedUser: state.AuthReducer.loggedUser,
	searchResults: state.SearchReducer.searchResults,
});

const mapDispatchToProps = (dispatch) => ({
	updateSearchResults: (results) => dispatch(updateSearchResults(results)),
});

function ConnectedSearch(props) {
	const headerContent = {
		resultsNo: 37,
		jobTitles: 'Web Developer, UX Designer',
		city: 'London',
	};

	// const profile = {
	// 	id: 1,
	// 	type: 'candidate',
	// 	name: 'Konstantin Ruhzev',
	// 	job_title: 'Full-Stack Web Developer',
	// 	city: 'Southampton',
	// 	remote_worker: true,
	// 	years_of_activity: 1,
	// 	higher_education: true,
	// 	description:
	// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pharetra tincidunt sem. Fusce quis nisi libero. Donec libero enim, laoreet a mi ut, sollicitudin dignissim neque. Nunc iaculis magna quam, et commodo leo mollis sit amet. Integer efficitur sapien quam, a vestibulum enim consequat eu. Nunc vitae tortor pretium, hendrerit quam eget, molestie nulla. Vivamus viverra felis non eros convallis, vitae cursus nisi interdum. Pellentesque blandit blandit dolor ut congue. Phasellus nisl turpis, aliquam nec turpis vel, vehicula aliquam orci. Cras feugiat at eros nec sodales. Sed porta tellus arcu, vitae maximus lectus vehicula at. Phasellus consectetur, quam ut placerat efficitur, lectus tellus efficitur diam...',
	// };

	useEffect(() => {
		const API_URL = process.env.REACT_APP_API_URL;
		const query = querySearch(props.location.search);

		const generateLink = () => {
			let link = `${API_URL}/api/users/job`;
			if (query.job1 && query.job2 && query.job3) {
				link += `/${query.job1}/${query.job2}/${query.job3}/location/${query.location}`;
			} else if (query.job1 && query.job2 && !query.job3) {
				link += `/${query.job1}/${query.job2}/location/${query.location}`;
			} else if (query.job1 && !query.job2 && !query.job3) {
				link += `/${query.job1}/location/${query.location}`;
			} else {
				link = link;
			}
			return link;
		};

		axios
			.get(generateLink(), { withCredentials: true })
			.then((res) => props.updateSearchResults(res.data.users));
	}, []);

	return (
		<div className="Search">
			{isEmpty(props.loggedUser) && <AuthNavbar bg={true} />}
			<Header type="search" content={headerContent} />
			<Sidebar />
			<div className="Search__content">
				{props.searchResults.map((profile) => (
					<SearchResult profile={profile} key={profile._id} />
				))}
			</div>
		</div>
	);
}
const Search = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearch);
export default Search;
