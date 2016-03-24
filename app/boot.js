//import from nodes_modules
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, Link, browserHistory, hashHistory } from 'react-router'
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// import Reducers
import todoReducer from 'todoReduxReducer.js';
import mainReducer from 'mainReducer.js';

// import other resources
import utils from 'utils.js';

// import React View Components
import MainApp from 'MainApp.jsx';
import TodoMVC from 'TodoMVC.jsx';
import TodoRedux from 'TodoRedux.jsx';
import DailyUI001 from 'DailyUI001.jsx';
import RedditApp from 'Reddit.jsx';


// import css files
import './assets/css/base.scss';

const loggerMiddleware = createLogger();
let store = createStore(mainReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

import { RedditActions, fetchPosts } from 'redditActions'

//store.dispatch(RedditActions.selectSubreddit('reactjs'))
// store.dispatch(fetchPosts('reactjs')).then(() =>
//   console.log(store.getState())
// )


render((
<Provider store={store}>
    <Router history={hashHistory}>
         <Route component={MainApp}>
             <Route path="gallery/todomvc" component={TodoMVC} />
             <Route path="gallery/todoredux" component={TodoRedux} />
             <Route path="gallery/reddit" component={RedditApp} />
             <Redirect from="/" to="gallery/todomvc" />
        </Route>
    </Router>
</Provider>), document.getElementById("content"));


/*
    <IndexRoute component={TodoMVC} />
    <Route path="about" component={About} />
*/
