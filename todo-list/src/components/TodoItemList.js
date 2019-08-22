import React, { Component } from "react";

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove } = this.props;

    return <div>TodoItem 자리입니다.</div>;
  }
}

export default TodoItemList;
