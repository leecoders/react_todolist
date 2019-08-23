import React, { Component } from "react";
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";
import Palette from "./components/Palette";

class App extends Component {
  id = 3;
  colors = ["#343a40", "#f03e3e", "#12b886", "#228ae6"];

  state = {
    input: "",
    todos: [
      { id: 0, text: "리액트 소개", checked: false, color: "#343a40" },
      { id: 1, text: "리액트 소개", checked: true, color: "#343a40" },
      { id: 2, text: "리액트 소개", checked: false, color: "#343a40" }
    ],
    color: "#343a40"
  };

  handleChangeColor = idx => {
    const nextColor = this.colors[idx];
    this.setState({
      color: nextColor
    });
  };

  handleChange = e => {
    // input이 변했을 때
    this.setState({
      input: e.target.value
    });
  };

  handleCreate = () => {
    // 추가 버튼이 클릭되었을 때
    const { input, todos, color } = this.state;
    this.setState({
      input: "",
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color: color
      })
    });
  };

  handleKeyPress = e => {
    // 엔터 키 입력되었을 때
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  handleToggle = id => {
    const { todos } = this.state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];

    const nextTodos = [...todos]; // 전개 연산자를 통해 배열을 복사(수정하면 안되니까)

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  };

  handleRemove = id => {
    const { todos } = this.state;
    this.setState({ todos: todos.filter(todo => todo.id !== id) });
  };

  render() {
    const { input, todos, color } = this.state;
    const {
      handleChangeColor,
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;
    return (
      <TodoListTemplate
        form={
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            color={color}
          />
        }
        palette={
          <Palette colors={this.colors} onChangeColor={handleChangeColor} />
        }
      >
        <TodoItemList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </TodoListTemplate>
    );
  }
}

export default App;
