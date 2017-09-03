/**
 * Created by wuming on 2017/7/11.
 */
import './utils/antm-viewport.min';
import './assets/css/reset.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import Home from './views/Home/Home';
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from '../src/store/configureStore';
const history = createBrowserHistory();
const store = configureStore();
render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home}></Route>
        </Router>
    </Provider>,
    document.getElementById("app")
);