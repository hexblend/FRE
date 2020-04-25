import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ articles: state.articles });

const ConnectedList = ({ articles }) => (
    <ul>
        {articles.map(article => (
            <li key={article.id}>{article.title}</li>
        ))}
    </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;