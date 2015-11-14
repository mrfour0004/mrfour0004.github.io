"use strict";

var TodoItem = React.createClass({
    handleToggle: function handleToggle(e) {
        var item = this.props.data;
        item.completed = e.target.checked;
        this.props.onUpdate(this.props.todoid, item);
    },
    handleDoubleClick: function handleDoubleClick(e) {
        e.preventDefault();
        if (e.target.disabled && !this.props.data.completed) e.target.disabled = false;
        e.target.focus();
    },
    handleBlur: function handleBlur(e) {
        e.target.disabled = true;
    },
    handleKeyDown: function handleKeyDown(e) {
        if (e.keyCode != 13) {
            return;
        }
        e.preventDefault();

        var item = this.props.data;
        item.description = e.target.value;
        this.props.onUpdate(this.props.todoid, item);

        e.target.disabled = true;
    },
    handleDelete: function handleDelete(e) {
        this.props.onDelete(this.props.todoid);
    },
    render: function render() {
        var hide = this.props.data.completed == true && this.props.filterType == "completed" || this.props.data.completed == false && this.props.filterType == "active";
        var classes = classNames({
            "todoItem": true,
            "completed": this.props.data.completed,
            "hide": this.props.filterType != "all" && !hide
        });
        return React.createElement(
            "li",
            { className: classes },
            React.createElement("input", { className: "todoToggle", type: "checkbox", onChange: this.handleToggle, checked: this.props.data.completed }),
            React.createElement("input", { className: "todoDescription", onBlur: this.handleBlur, defaultValue: this.props.data.description, onDoubleClick: this.handleDoubleClick, onKeyDown: this.handleKeyDown, disabled: true }),
            React.createElement("span", { className: "todoDelete", onClick: this.handleDelete })
        );
    }
});

var TodoList = React.createClass({
    render: function render() {

        return React.createElement(
            "ul",
            { className: "todoList" },
            this.props.data.map((function (item, index) {
                return React.createElement(TodoItem, { key: item.id, todoid: index, filterType: this.props.filterType, onUpdate: this.props.onUpdate, onDelete: this.props.onDelete, data: item });
            }).bind(this))
        );
    }
});

var TodoFilterRadio = React.createClass({
    handleChange: function handleChange(e) {
        var filter = e.target.value;
        this.props.onFilterChange(filter);
    },
    render: function render() {
        var filter = this.props.filter.toLowerCase();
        var id = "todoFilter-" + filter;

        return React.createElement(
            "div",
            { className: "todoSwitch" },
            React.createElement("input", { type: "radio", name: "todoFilter", defaultChecked: filter == "all" ? true : false, id: id, value: filter, onChange: this.handleChange }),
            React.createElement(
                "label",
                { htmlFor: id },
                this.props.filter
            )
        );
    }
});

var TodoFilter = React.createClass({
    render: function render() {
        return React.createElement(
            "div",
            { className: "todoSwitchBox" },
            React.createElement(TodoFilterRadio, { filter: "all", onFilterChange: this.props.onFilterChange }),
            React.createElement(TodoFilterRadio, { filter: "active", onFilterChange: this.props.onFilterChange }),
            React.createElement(TodoFilterRadio, { filter: "completed", onFilterChange: this.props.onFilterChange })
        );
    }
});

var TodoFooter = React.createClass({
    render: function render(argument) {
        return React.createElement(
            "div",
            { className: "todoFooter" },
            React.createElement(
                "span",
                { className: "countsNumber" },
                this.props.counts
            ),
            React.createElement(
                "span",
                { className: "countsNumber" },
                "items left"
            ),
            React.createElement(TodoFilter, { onFilterChange: this.props.onFilterChange }),
            React.createElement(
                "button",
                { onClick: this.props.onClearCompleted, className: "btn-clr" },
                "Clear Completed"
            )
        );
    }
});

var TodoMVC = React.createClass({
    getInitialState: function getInitialState() {
        return {
            data: [],
            activeCounts: 0,
            filterType: "all"
        };
    },
    componentDidMount: function componentDidMount() {
        TodoApp.getList((function (data) {
            this.setState({ data: data });
        }).bind(this));
    },
    getActiveCountes: function getActiveCountes() {
        return $(ReactDOM.findDOMNode(this.refs.TodoList)).children("li:not(.completed)").length;
    },
    handleFilter: function handleFilter(filterType) {
        this.setState({ filterType: React.addons.update(this.state.filterType, { $set: filterType }) });
    },
    append: function append(e) {
        if (e.keyCode != 13) {
            return;
        }
        e.preventDefault();

        TodoApp.append({
            description: e.target.value,
            success: (function (list) {
                this.setState({ data: list });
                this.setState({ activeCounts: this.getActiveCountes() });
            }).bind(this)
        });

        e.target.value = '';
    },
    update: function update(index, item) {
        TodoApp.update({
            index: index,
            item: item,
            success: (function (list) {
                this.setState({ data: list });
                this.setState({ activeCounts: this.getActiveCountes() });
            }).bind(this)
        });
    },
    delete: function _delete(index) {
        TodoApp.delete({
            index: index,
            success: (function (list) {
                this.setState({ data: React.addons.update(this.state.data, { $splice: [[index, 1]] }) });
                this.setState({ activeCounts: this.getActiveCountes() });
            }).bind(this)
        });
    },
    clear: function clear() {
        TodoApp.clear();
        this.setState({ data: [] });
        this.setState({ activeCounts: this.getActiveCountes() });
    },
    clearCompleted: function clearCompleted() {
        var list = this.state.data;
        for (var i = 0; i < list.length; i++) {
            if (list[i].completed) {
                list.splice(i--, 1);
            }
        }
        TodoApp.set(list);
        this.setState({ data: React.addons.update(this.state.data, { $set: list }) });
        this.setState({ activeCounts: this.getActiveCountes() });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "todoBox" },
            React.createElement("input", { className: "todoInput", type: "text", placeholder: "What needs to be done?", onKeyDown: this.append }),
            React.createElement(TodoList, { onUpdate: this.update, onDelete: this.delete, data: this.state.data, filterType: this.state.filterType, ref: "TodoList" }),
            React.createElement(TodoFooter, { counts: this.state.activeCounts, onClearCompleted: this.clearCompleted, onClear: this.clear, onFilterChange: this.handleFilter })
        );
    }
});

// ReactDOM.render(
//     <TodoBox />,
//     document.getElementById("content")
// );