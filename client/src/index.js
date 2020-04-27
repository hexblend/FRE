import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';

import { Provider } from 'react-redux';
import store from './js/redux/store/index';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
