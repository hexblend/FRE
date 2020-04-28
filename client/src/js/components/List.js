import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({ articles: state.articles });

function ConnectedList({ articles }) {
	return (
		<ul>
			{articles.map((article) => (
				<li key={article.id}>{article.title}</li>
			))}
		</ul>
	);
}

const List = connect(mapStateToProps)(ConnectedList);

export default List;
