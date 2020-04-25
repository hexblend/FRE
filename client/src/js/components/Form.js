import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addArticle } from '../actions/index';

const mapDispatchToProps = dispatch => {
    return {
        addArticle: article => dispatch(addArticle(article))
    };
}

function ConnectedForm(props) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addArticle({ title });
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <button type="submit">SAVE</button>
        </form>
    );
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm); // null for mapStateToProps
export default Form;