import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { BASE_PATH } from './config/settings';

import App from './App';

ReactDOM.render(
    <BrowserRouter
    basename={BASE_PATH}
    forceRefresh={true}
    >
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
