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
      <input type="text" placeholder="What needs to be done?" onChange={this.handleChange} onKeyDown={this.handleKeyDown} ref="todoText" />
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
    return <input type="text" value={this.state.value} onChange={this.handleChange} />;
  }
});

var TodoItem = React.createClass({
  handleToggle: function(e) {
    var checked = e.target.checked;
    this.props.data.checked = checked;
    this.props.data.status = (checked) ? "completed" : "active";

    if (checked) {
      $(this.getDOMNode).addClass("completed");
    } else {
      $(this.getDOMNode).removeClass("compoleted");
    }

    this.props.onUpdate(this.props.todoid, this.props.data);
  },
  handleDelete: function(e) {
    this.props.onDelete(this.props.todoid);
    //$(this.getDOMNode()).remove()
  },
  componentDidMount: function() {
    this.getDOMNode().querySelector('[type="checkbox"]').checked = this.props.data.checked;
    if (this.props.data.status == "Deleted") $(this.getDOMNode()).css({display: "none"});
  },
  render: function(){
    return (
      <li className="todoItem">
        <input type="checkbox" onChange={this.handleToggle} />
        <TodoDescription description={this.props.data.description} />
        <span className="TodoDelete" onClick={this.handleDelete}>x</span>
      </li>
    );
  }
});


var TodoList = React.createClass({
  render: function() {
    return (
      <ul className="todoList">
        {this.props.data.map(function(item, index) {
          return <TodoItem key={index} todoid={index} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} data={item} />
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
      <div className="todoToggle">
        <input type="radio" name="todoFilter" id={id} value={filter} onChange={this.handleChange} />
        <label for={id}>{this.props.filter}</label>
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
      <div className="todoFilterSwitch">
        <TodoFilterRadio filter="All" checked={true} onFilterChange={this.props.onFilterChange} />
        <TodoFilterRadio filter="Active" checked={false} onFilterChange={this.props.onFilterChange} />
        <TodoFilterRadio filter="Completed" checked={false} onFilterChange={this.props.onFilterChange} />
      </div>
    )
  }
})

var TodoFooter = React.createClass({
  render: function (argument) {
    return (
      <div className="todoFooter">
        <TodoFilter onFilterChange={this.props.onFilterChange} />
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
  successCallback: function(list) {
    this.setState({data: list})
  }.bind(this),
  handleFilter: function(filterType) {
    switch (filterType) {
      case "all":
        console.log("All selected")
        break;
      case "active":
        $(this.getDOMNode.querySelector("")).addClass()
        break;
      case "completed":
        console.log("Completed selected")
        break;
    }
  },
  append: function(description) {
    TodoApp.append({
      description: description,
      success: function(list) {
        this.setState({data: list})
      }.bind(this)
    });
  },
  update: function(index, item) {
    TodoApp.update({
      index: index,
      item: item,
      success: function(list) {
        data: update(this.state.data, {$splice: [[index, 1]]})
      }.bind(this)
    })
  },
  delete: function(index) {
    TodoApp.delete({
      index: index,
      success: function(list) {
        this.setState({
          data: update(this.state.data, {$splice: [[index, 1]]})
        });
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="TodoBox">
        <TodoInput onEnterKeyDown={this.append} />
        <TodoList onUpdate={this.update} onDelete={this.delete} data={this.state.data} />
        <TodoFooter todoCount={this.state.data.length} onFilterChange={this.handleFilter} />
      </div>
    );
  }
});

TodoApp.getList(function(data) {
  console.log(data);
  React.render(
    <TodoBox data={data}/>,
    document.getElementById("content")
  );
})
