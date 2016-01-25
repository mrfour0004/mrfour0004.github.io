import React, { PropTypes } from 'react';
import BaseComponent from 'BaseComponent.jsx';
import { createStore, Provider } from 'redux';
import { connect } from 'react-redux';

import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from 'todoReduxActions.js'

class AddTodo extends BaseComponent {
    render() {
        return (
            <div>
            <input type='text' ref='input' />
            <button onClick={e => this.handleClick(e)}>Add</button>
            </div>
        )
    }

    handleClick(e) {
        const node = this.refs.input
        const text = node.value.trim()
        this.props.onAddClick(text)
        node.value = ''
    }
}

AddTodo.propTypes = {
    onAddClick: PropTypes.func.isRequired
}

class Todo extends BaseComponent {
    render() {
        return (
            <li onClick={this.props.onClick}
            style={{
                textDecoration: this.props.completed ? 'line-through' : 'none',
                cursor: this.props.completed ? 'default' : 'pointer'
            }}>
            {this.props.text}
            </li>
        )
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
}

class TodoList extends BaseComponent {
    render() {
        return (
            <ul>
            {this.props.todos.map((todo, index) =>
                <Todo {...todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)} />
            )}
            </ul>
        )
    }
}

TodoList.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
}

class Footer extends BaseComponent {
    renderFilter(filter, name) {
        if (filter === this.props.filter) {
            return name
        }

        return (
            <a href='#' onClick={e => {
                e.preventDefault()
                this.props.onFilterChange(filter)
            }}>
            {name}
            </a>
        )
    }

    render() {
        return (
            <p>
            Show:
            {' '}
            {this.renderFilter('SHOW_ALL', 'All')}
            {', '}
            {this.renderFilter('SHOW_COMPLETED', 'Completed')}
            {', '}
            {this.renderFilter('SHOW_ACTIVE', 'Active')}
            .
            </p>
        )
    }
}

Footer.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

export default class TodoRedux extends BaseComponent {
//class TodoRedux extends BaseComponent {
    render() {
        const { dispatch, visibleTodos, visibilityFilter } = this.props

        return (
            <div>
                <AddTodo onAddClick = {text => dispatch(addTodo(text))} />
                <TodoList todos = {visibleTodos} onTodoClick = { index => dispatch(completeTodo(index)) } />
                <Footer filter = {visibilityFilter} onFilterChange = { filter => dispatch(setVisibilityFilter(filter)) }/>
            </div>
        )
    }
}


TodoRedux.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
        return todos
        case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.completed)
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        visibleTodos: selectTodos(state.reduxTodos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

export default connect(select)(TodoRedux);

// export default class TodoMVC extends BaseComponent {
//     render () {
//         return (<div className="TodoMVC">This is TodoMVC</div>);
//     }
// }
