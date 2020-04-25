import React from "react";
import List from "./List";
import Form from './Form';

const App = () => (
    <div className="App">
        <div>
            <h2>Articles</h2>
            <List />
        </div>
        <div>
            <h2>Add new article</h2>
            <Form />      
        </div>
    </div>
);

export default App;