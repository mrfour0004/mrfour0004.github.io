import React, { PropTypes } from 'react';
import BaseComponent from 'BaseComponent.jsx';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classNames';

import { Actions } from 'todoActions.js'

const TodoSwitch = ({id, filter, changeHandler}) => (
    <div className="todoSwitch">
        <input type="radio" name="todoFilter" defaultChecked={(filter == "all") ? true : false} id={id} value={filter} onChange={changeHandler} />
        <label htmlFor={id}>{filter}</label>
    </div>
)

class TodoFooter extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind('switchChangeHandler');
    }

    switchChangeHandler (e) {
        this.props.filterChangeHandler(e.target.value);
    }

    render() {

        return (
            <div className="todoFooter">
                <span className="countsNumber">{this.props.counts}</span><span className="countsNumber">items left</span>
                <div className="todoSwitchBox">
                    {['all', 'active', 'completed'].map((filter) => (
                        <TodoSwitch key={filter} id={"todoFilter-" + filter} filter={filter} changeHandler={this.props.filterChangeHandler}  />
                    ))}
                </div>
                <button onClick={this.props.deleteAllHandler} className="btn-clr">Clear Completed</button>
            </div>
        )
    }
}

class TodoInput extends BaseComponent {
    render () {
        let props = {
            className: "todoInput",
            type: "text",
            placeholder: "What needs to be done?"
        }

        return (
            <input className="todoInput" type="text" onKeyDown={this.props.keyDownHandler} placeholder="What needs to be done?" />
        );
    }
}

class TodoItem extends BaseComponent {
    render () {
        let { completed, description } = this.props.todo;

        var hide = (completed == true && this.props.filter == "completed") || (completed == false && this.props.filter == "active");
        var classes = classNames({
            todoItem: true,
            completed: completed,
            hide: this.props.filter != "all" && !hide
        })
        return (
            <li className={classes}>
                <input className="todoToggle" type="checkbox" checked={completed} onChange={this.props.completeHandler} />
                <input className="todoDescription" type="text" defaultValue={description} />
                <span className="todoDelete" onClick={this.props.deleteHandler}></span>
            </li>
        );
    }
}

class TodoList extends BaseComponent {
    render () {
        let todoProps = {
            filter: this.props.filter,
            deleteHandler: this.props.deleteHandler,
            completeHandler: this.props.completeHandler
        }
        console.log(this.props.todos);
        return (
            <ul className="todoList">
            {this.props.todos.map((todo, index) =>
                <TodoItem key={todo.id} todo={todo} {...todoProps}
                    completeHandler={() => this.props.completeHandler(index)}
                    deleteHandler={() => this.props.deleteHandler(index)}  />
            )}
            </ul>
        )
    }
}

class TodoMVC extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind('onTodoInputKeyPress');
    }

    shouldComponentUpdate (nextProps, nextState) {
        return this._compareProps(nextProps, 'todos', 'todoFilter');
    }

    onTodoInputKeyPress (e) {
        if (e.keyCode != 13) return;

        let value = e.target.value;
        this.props.dispatch(Actions.addTodo(value));

        e.target.value= "";
    }

    render () {
        const { dispatch } = this.props;
        return (
            <div className="todoBox">
                <TodoInput keyDownHandler={this.onTodoInputKeyPress} />
                <TodoList todos={this.props.todos} filter={this.props.todoFilter}
                    deleteHandler={index => dispatch(Actions.deleteTodo(index))}
                    completeHandler={index => dispatch(Actions.completeTodo(index))} />
                <TodoFooter counts={this.props.todos.length}
                    filterChangeHandler={(e) => dispatch(Actions.setFilter(e.target.value))}
                    deleteAllHandler={() => dispatch(Actions.deleteAll())} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        todoFilter: state.todoFilter
    }
}

export default connect(mapStateToProps)(TodoMVC);
