import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "react-redux";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import { logger } from './Middlewares/index.js';
import './index.css'
import { thunk } from 'redux-thunk';
import rootReducer from './Reducers/rootReducer.js';

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const composedEnhancers = composeAlt(applyMiddleware(thunk, logger)
);

const store = createStore(rootReducer, composedEnhancers);
   

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
)