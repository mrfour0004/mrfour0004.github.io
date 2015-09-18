var TodoItem = React.createClass({
  handleToggle: function(e) {
    var item = this.props.data;
    item.completed = e.target.checked;
    this.props.onUpdate(this.props.todoid, item);
  },
  handleDoubleClick: function(e) {
    e.preventDefault();
    if (e.target.disabled && !this.props.data.completed) e.target.disabled = false;
    e.target.focus();
  },
  handleBlur: function(e) {
    e.target.disabled = true;
  },
  handleKeyDown: function (e) {
    if (e.keyCode != 13) {
      return;
    }
    e.preventDefault();

    var item = this.props.data;
    item.description = e.target.value;
    this.props.onUpdate(this.props.todoid, item);

    e.target.disabled = true;
  },
  handleDelete: function(e) {
    this.props.onDelete(this.props.todoid);
  },
  render: function(){
    var hide = (this.props.data.completed == true && this.props.filterType == "completed") || (this.props.data.completed == false && this.props.filterType == "active");
    var classes = React.addons.classSet({
      "todoItem": true,
      "completed": this.props.data.completed,
      "hide": this.props.filterType != "all" && !hide
    })
    return (
      <li className={classes}>
        <input className="todoToggle" type="checkbox" onChange={this.handleToggle} checked={this.props.data.completed} />
        <input className="todoDescription" onBlur={this.handleBlur} defaultValue={this.props.data.description} onDoubleClick={this.handleDoubleClick} onKeyDown={this.handleKeyDown} disabled />
        <span className="todoDelete" onClick={this.handleDelete}></span>
      </li>
    );
  }
});


var TodoList = React.createClass({
  render: function() {
    return (
      <ul className="todoList">
        {this.props.data.map(function(item, index) {
          return <TodoItem key={item.id} todoid={index} filterType={this.props.filterType} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} data={item} />
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
        <TodoFilterRadio filter="all" checked={true} onFilterChange={this.props.onFilterChange} />
        <TodoFilterRadio filter="active" checked={false} onFilterChange={this.props.onFilterChange} />
        <TodoFilterRadio filter="completed" checked={false} onFilterChange={this.props.onFilterChange} />
      </div>
    )
  }
})

var TodoFooter = React.createClass({
  render: function (argument) {
    return (
      <div className="todoFooter">
        <span className="countsNumber">{this.props.counts}</span><span className="countsNumber">items left</span>
        <TodoFilter onFilterChange={this.props.onFilterChange} />
        <button onClick={this.props.onClearCompleted} className="btn-clr">Clear Completed</button>
      </div>
    )
  }
});

var TodoBox = React.createClass({
  getInitialState: function() {
    var activeCounts = 0;
    $.each(this.props.data, function(index, item) {
      if (!item.completed) activeCounts++;
    })

    return {
      data: this.props.data,
      activeCounts: activeCounts,
      filterType: "all"
    }
  },
  getActiveCountes: function() {
    return $(React.findDOMNode(this.refs.TodoList)).children("li:not(.completed)").length;
  },
  handleFilter: function(filterType) {
    this.setState({filterType: React.addons.update(this.state.filterType, {$set: filterType})});
  },
  append: function(e) {
    if (e.keyCode != 13) {
      return;
    }
    e.preventDefault();

    TodoApp.append({
      description: e.target.value,
      success: function(list) {
        this.setState({data: list});
        this.setState({activeCounts: this.getActiveCountes()});
      }.bind(this)
    });

    e.target.value = '';
  },
  update: function(index, item) {
    TodoApp.update({
      index: index,
      item: item,
      success: function(list) {
        this.setState({data: list});
        this.setState({activeCounts: this.getActiveCountes()});
      }.bind(this)
    })
  },
  delete: function(index) {
    TodoApp.delete({
      index: index,
      success: function(list) {
        this.setState({data: React.addons.update(this.state.data, {$splice: [[index, 1]]})});
        this.setState({activeCounts: this.getActiveCountes()});
      }.bind(this)
    });
  },
  clear: function() {
    TodoApp.clear();
    this.setState({data: []});
    this.setState({activeCounts: this.getActiveCountes()});
  },
  clearCompleted: function() {
    var list = this.state.data;
    for (var i = 0; i < list.length; i++) {
      if (list[i].completed) {
        list.splice(i--, 1);
      }
    }
    TodoApp.set(list);
    this.setState({data: React.addons.update(this.state.data, {$set: list})});
    this.setState({activeCounts: this.getActiveCountes()});
  },
  render: function() {
    return (
      <div className="todoBox">
        <input className="todoInput" type="text" placeholder="What needs to be done?" onKeyDown={this.append} />
        <TodoList onUpdate={this.update} onDelete={this.delete} data={this.state.data} filterType={this.state.filterType} ref="TodoList" />
        <TodoFooter counts={this.state.activeCounts} onClearCompleted={this.clearCompleted} onClear={this.clear} onFilterChange={this.handleFilter} />
      </div>
    );
  }
});

TodoApp.getList(function(data) {
  React.render(
    <TodoBox data={data} />,
    document.getElementById("content")
  );
});
