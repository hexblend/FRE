import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions/index';

const mapStateToProps = (state) => ({
	articles: state.remoteArticles.slice(0, 10)
});

const mapDispatchToProps = { getData };

const ConnectedPosts = (props) => {
	useEffect(() => {
		props.getData();
	}, []);

	return (
		<ul>
			{props.articles.map((article) => (
				<li key={article.id}>{article.title}</li>
			))}
		</ul>
	);
};

const Posts = connect(mapStateToProps, mapDispatchToProps)(
	ConnectedPosts
);
export default Posts;
