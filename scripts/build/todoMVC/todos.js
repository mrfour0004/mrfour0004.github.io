"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todo = function Todo(description) {
    _classCallCheck(this, Todo);

    this.id = new Date().valueOf();
    this.completed = false;
    this.description = description;
};

var TodoApp = {
    Key: "todoList",
    init: function init() {
        if (localforage.length <= 0) {
            localforage.setItem(this.Key, [], null);
        };
    },
    getList: function getList(callback) {
        localforage.getItem(this.Key, function (err, value) {
            if (value == null) callback([]);else callback(value);
        });
    },
    getCompletedList: function getCompletedList() {},
    append: function append(obj) {
        ;
        TodoApp.getList(function (list) {
            var item = new Todo(obj.description, obj.index);
            list.push(item);

            TodoApp.save(list);
            obj.success(list);
        });
    },
    update: function update(obj) {
        TodoApp.getList(function (list) {
            list[obj.index] = obj.item;
            TodoApp.save(list);
            obj.success(list);
        });
    },
    delete: function _delete(obj) {
        TodoApp.getList(function (list) {
            list.splice(obj.index, 1);
            TodoApp.save(list);

            obj.success(list);
        });
    },
    set: function set(list) {
        localforage.setItem(this.Key, list, null);
    },
    save: function save(list) {
        localforage.setItem(this.Key, list);
    },
    clear: function clear(callback) {
        localforage.clear();
        localforage.setItem(this.Key, [], null);
    }
};

TodoApp.init();