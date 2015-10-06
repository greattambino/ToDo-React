(function(root) {
  'use strict';
  var _todos = [];
  var _callbacks = [];

  root.TodoStore = {
    all: function(){
      return _todos.slice();
    },

    fetch: function(){
      var that = this;

      $.ajax({
        url: 'api/todos/',
        type: 'GET',
        dataType: 'json',
        success: function(list) {
          _todos = list;
          that.changed();
        }
      });
    },

    create: function(todo) {
      var that = this;

      $.ajax({
        url: 'api/todos/',
        type: 'POST',
        data: todo,
        dataType: 'json',
        success: function(response) {
          _todos.push(response);
          that.changed();
        }
      });
    },

    find: function(id) {
      var retIdx = -1;
      _todos.forEach(function(todo, idx){
        if (todo.id === id) {
          retIdx = idx;
        }
      });

      return retIdx;
    },

    destroy: function(id) {
      var idx = this.find(id);
      var that = this;

      $.ajax({
        url: '/api/todos/' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function(resp) {
          _todos.splice(idx, 1);
          that.changed();
        }
      });
    },

    toggleDone: function(id) {
      var idx = this.find(id);
      var that = this;

      $.ajax({
        url: 'api/todos/' + id,
        type: 'PATCH',
        data: {todo:{ done: !_todos[idx].done }},
        dataType: 'json',
        success: function(resp){
          _todos[idx].done = !_todos[idx].done;
          that.changed();
        }
      });
    },

    changed: function () {
      _callbacks.forEach(function(callback){
        callback();
      });
    },

    addChangedHandler: function (callback) {
      _callbacks.push(callback);
    },

    removeChangedHandler: function (callback) {
      var idx = _callbacks.indexOf(callback);
      if (idx !== -1) {
        _callbacks.splice(idx, 1);
      }
    }
  };
}(this));
