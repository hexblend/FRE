import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions/index';

const mapStateToProps = (state) => ({
	articles: state.remoteArticles.slice(0, 10)
});

const mapDispatchToProps = { getData };

const ConnectedPosts = ({ getData, articles }) => {
	useEffect(
		() => {
			getData();
		},
		[ getData ] // Only rerun if the getData changes
	);

	return (
		<ul>
			{articles.map((article) => (
				<li key={article.id}>{article.title}</li>
			))}
		</ul>
	);
};

const Posts = connect(mapStateToProps, mapDispatchToProps)(
	ConnectedPosts
);
export default Posts;
