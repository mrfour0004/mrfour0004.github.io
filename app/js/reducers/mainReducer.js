import { combineReducers } from 'redux'

import { todos, todoFilter } from 'todoReducer.js';
import { reduxTodos, visibilityFilter } from 'todoReduxReducer.js'

export default combineReducers({
    reduxTodos,
    visibilityFilter,
    todos,
    todoFilter
})
