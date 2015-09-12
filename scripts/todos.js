function Todo(description) {
  this.id = new Date().valueOf();
  this.completed = false;
  this.description = description;
}

var TodoApp = {
  Key: "todoList",
  init: function() {
    if (localforage.length <= 0) {
      localforage.setItem(this.Key, [], null);
    };
  },
  getList: function(callback) {
    localforage.getItem(this.Key, function(err, value) {
      if (value == null) callback([]);
      else callback(value);
    });
  },
  getCompletedList: function() {

  },
  append: function(obj) {;
    TodoApp.getList(function(list) {
      var item = new Todo(obj.description, obj.index);
      list.push(item);

      TodoApp.save(list);
      obj.success(list);
    });
  },
  update: function(obj) {
    TodoApp.getList(function(list) {
      list[obj.index] = obj.item;
      TodoApp.save(list);
      obj.success(list);
    });
  },
  delete: function(obj) {
    TodoApp.getList(function(list) {
      list.splice(obj.index, 1);
      TodoApp.save(list);

      obj.success(list);
    });
  },
  save: function(list) {
    localforage.setItem(this.Key, list);
  },
  clear: function() {
    localforage.clear();
    localforage.setItem(this.Key, [], null);
  }
}

TodoApp.init()
