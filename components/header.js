//require('react/addons');

var TodoInput = React.createClass({
  handleChange: function(e) {
    this.value = e.target.value
  },
  handleKeyDown: function(e) {
    if (e.keyCode != 13) {
      return;
    }
    e.preventDefault();

    this.props.onEnterKeyDown(this.value)
    e.target.value = ''
  },
  render: function() {
    return (
      <input className="todoInput" type="text" placeholder="What needs to be done?" onChange={this.handleChange} onKeyDown={this.handleKeyDown} ref="todoText" />
    )
  }
})

var TodoDescription = React.createClass({
  getInitialState: function() {
    return {value: this.props.description};
  },
  componentDidMount: function() {
    this.value = this.state.value;
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return <input className="todoDescription" type="text" value={this.state.value} onChange={this.handleChange} />;
  }
});

var TodoItem = React.createClass({
  getInitialState: function() {
    return { data: this.props.data }
  },
  handleToggle: function(e) {
    var checked = e.target.checked;
    this.state.data.completed = checked;

    this.props.onUpdate(this.props.todoid, this.state.data);
  },
  handleDelete: function(e) {
    this.props.onDelete(this.props.todoid);
  },
  componentDidMount: function() {
    this.getDOMNode().querySelector('[type="checkbox"]').checked = this.state.data.completed;
  },
  componentWillUnmount: function() {

  },
  render: function(){
    var classes = React.addons.classSet({
      "todoItem": true,
      "completed": this.state.data.completed
    })
    return (
      <li className={classes}>
        <input className="todoToggle" type="checkbox" onChange={this.handleToggle} />
        <TodoDescription description={this.props.data.description} />
        <span className="todoDelete" onClick={this.handleDelete}></span>
      </li>
    );
  }
});


var TodoList = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  render: function() {
    return (
      <ul className="todoList">
        {this.state.data.map(function(item, index) {
          return <TodoItem key={item.id} todoid={index} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} data={item} />
        }.bind(this))}
      </ul>
    )
  }
});

var TodoFilterRadio = React.createClass({
  handleChange: function(e) {
    var filter = e.target.value
    this.props.onFilterChange(filter);
  },
  render: function() {
    var filter = this.props.filter.toLowerCase();
    var id = "todoFilter-" + filter;

    return (
      <div className="todoSwitch">
        <input type="radio" name="todoFilter" id={id} value={filter} onChange={this.handleChange} />
        <label htmlFor={id}>{this.props.filter}</label>
      </div>
    )
  }
});
var TodoFilter = React.createClass({
  componentDidMount: function() {
    this.getDOMNode().querySelector('#todoFilter-all').checked = true;
  },
  render: function() {
    return (
      <div className="todoSwitchBox">
        <TodoFilterRadio filter="All" checked={true} onFilterChange={this.props.onFilterChange} />
        <TodoFilterRadio filter="Active" checked={false} onFilterChange={this.props.onFilterChange} />
        <TodoFilterRadio filter="Completed" checked={false} onFilterChange={this.props.onFilterChange} />
      </div>
    )
  }
})

var TodoFooter = React.createClass({
  getInitialState: function() {
    return {
      counts: this.props.counts
    }
  },
  render: function (argument) {
    return (
      <div className="todoFooter">
        <span className="countsNumber">{this.state.counts}</span><span className="countsNumber">items left</span>
        <TodoFilter onFilterChange={this.props.onFilterChange} />
        <button onClick={this.props.onClearCompleted} className="btn-clr">Clear Completed</button>
      </div>
    )
  }
});

var TodoBox = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  handleFilter: function(filterType) {
    var todoList = $(React.findDOMNode(this.refs.TodoList));
    switch (filterType) {
      case "all":
        todoList.children().removeClass("hide");
        break;
      case "active":
        todoList.children(".completed").addClass("hide");
        todoList.children("li:not(.completed)").removeClass("hide");
        break;
      case "completed":
        todoList.children(".completed").removeClass("hide");
        todoList.children("li:not(.completed)").addClass("hide");
        break;
    }
  },
  append: function(description) {
    TodoApp.append({
      description: description,
      success: function(list) {
        this.refs.TodoList.setState({data: list});
        this.refs.TodoFooter.setState({counts: list.length});
      }.bind(this)
    });
  },
  update: function(index, item) {
    TodoApp.update({
      index: index,
      item: item,
      success: function(list) {
        this.refs.TodoList.setState({data: list});
      }.bind(this)
    })
  },
  delete: function(index) {
    TodoApp.delete({
      index: index,
      success: function(list) {
        this.refs.TodoList.setState({data: React.addons.update(this.refs.TodoList.state.data, {$splice: [[index, 1]]})});
        this.refs.TodoFooter.setState({counts: list.length})
      }.bind(this)
    });
  },
  clear: function() {
    TodoApp.clear();
    this.refs.TodoList.setState({data: []});
    this.refs.TodoFooter.setState({counts: 0})
  },
  clearCompleted: function() {
    var list = this.refs.TodoList.state.data;
    for (var i = 0; i < list.length; i++) {
      if (list[i].completed) {
        list.splice(i--, 1);
      }
    }
    TodoApp.set(list);
    this.refs.TodoList.setState({data: React.addons.update(this.refs.TodoList.state.data, {$set: list})});
    this.refs.TodoFooter.setState({counts: list.length});
  },
  render: function() {
    return (
      <div className="todoBox">
        <TodoInput onEnterKeyDown={this.append} />
        <TodoList onUpdate={this.update} onDelete={this.delete} data={this.state.data} ref="TodoList" />
        <TodoFooter counts={this.state.data.length} onClearCompleted={this.clearCompleted} onClear={this.clear} onFilterChange={this.handleFilter} ref="TodoFooter" />
      </div>
    );
  }
});

TodoApp.getList(function(data) {
  React.render(
    <TodoBox data={data} />,
    document.getElementById("content")
  );
})
