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
				link += '';
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
