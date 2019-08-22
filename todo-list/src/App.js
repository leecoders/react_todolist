import React, { Component } from "react";
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";

class App extends Component {
  id = 3;

  state = {
    input: "",
    todos: [
      { id: 0, text: "리액트 소개", checked: false },
      { id: 1, text: "리액트 소개", checked: true },
      { id: 2, text: "리액트 소개", checked: false }
    ]
  };

  handleChange = e => {
    // input이 변했을 때
    this.setState({
      input: e.target.value
    });
  };

  handleCreate = () => {
    // 추가 버튼이 클릭되었을 때
    const { input, todos } = this.state;
    this.setState({
      input: "",
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  };

  handleKeyPress = e => {
    // 엔터 키 입력되었을 때
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  render() {
    const { input } = this.state;
    const { handleChange, handleCreate, handleKeyPress } = this;
    return (
      <TodoListTemplate
        form={
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
          />
        }
      >
        <TodoItemList />
      </TodoListTemplate>
    );
  }
}

export default App;
