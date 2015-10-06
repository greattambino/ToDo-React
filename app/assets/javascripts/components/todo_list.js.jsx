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

  todosChanged: function() {
    this.setState({ store: TodoStore.all() });
  },

  render: function() {
    return (
      <div>
        {this.state.store.map(function(todo) {
          return <li> <TodoListItem key={todo.id} item={todo}/> </li>;
        })}
      </div>);
  }

});

var TodoListItem = React.createClass({

  render: function(){
    return(
      <div>
        <div> {this.props.item.title}</div>
        <div> {this.props.item.body} </div>
      </div>
    );
  }


});
