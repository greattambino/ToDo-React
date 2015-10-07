/* global React */
/* global TodoStore */



var TodoList = React.createClass({

  getInitialState: function() {
    return {
      store: TodoStore.all()
    };
  },

  componentDidMount: function() {
    TodoStore.fetch();
    TodoStore.addChangedHandler(this.todosChanged);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  handleDestroy: function(id) {
    TodoStore.destroy(id);
  },

  todosChanged: function() {
    this.setState({ store: TodoStore.all() });
  },

  render: function() {
    var that = this;
    return (
      <div>
        {this.state.store.map(function(todo) {
          return <TodoListItem destroyClick={that.handleDestroy.bind(null, todo.id)} key={todo.id} item={todo}/>;
        })}
        <TodoForm/>
      </div>);
  }

});

var TodoForm = React.createClass({

  getInitialState: function() {
    return {
            title: "",
            body: ""
            };
  },
  updateTitle: function(e) {
    this.setState({ title: e.target.value });
  },
  updateBody: function(e) {
    this.setState({ body: e.target.value });
  },
  handleClick: function(e) {
      var params = {todo: {title: this.state.title , body: this.state.body }};
      TodoStore.create(params);
      this.setState({ title: "",
                      body: ""
                    });

  },

  render: function() {
    return(
      <div>
          Title<br/>
        <input type="text" value={this.state.title} onInput={this.updateTitle} /><br/>
          Body<br/>
        <textarea value={this.state.body} onInput={this.updateBody}/><br/>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
});

var TodoListItem = React.createClass({

  render: function(){

    return(
      <div>
        <div>
          {this.props.item.title}
          <button onClick={this.props.destroyClick}>Delete</button>
        </div>
        <div> {this.props.item.body} </div>
      </div>
    );
  }


});
