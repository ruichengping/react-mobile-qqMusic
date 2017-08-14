/**
 * Created by wuming on 2017/7/11.
 */
import './utils/antm-viewport.min';
import React from 'react';
import { render } from 'react-dom';
import {  Router,Route } from 'react-router';
import Home from './views/Home/Home';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();
render(
    <Router history={history}>
        <Route path="/" component={Home}/>
    </Router>,
    document.getElementById("app")
);