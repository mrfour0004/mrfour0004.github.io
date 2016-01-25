import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, Link, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { syncHistory, routeReducer } from 'redux-simple-router'

import todoReducer from 'todoReduxReducer.js';
import mainReducer from 'mainReducer.js';

import utils from 'utils.js';

import MainApp from 'MainApp.jsx';

import TodoMVC from 'TodoMVC.jsx';
import TodoRedux from 'TodoRedux.jsx';
import DailyUI001 from 'DailyUI001.jsx';

import './assets/css/base.scss';

let store = createStore(mainReducer);

render((
<Provider store={store}>
    <Router history={browserHistory}>
        <Route component={MainApp}>
            <Route path="gallery/todomvc" component={TodoMVC} />
            <Route path="gallery/todoredux" component={TodoRedux} />
            <Redirect from="/" to="gallery/todomvc" />
        </Route>
    </Router>
</Provider>), document.getElementById("content"));


/*
    <IndexRoute component={TodoMVC} />
    <Route path="about" component={About} />
*/
