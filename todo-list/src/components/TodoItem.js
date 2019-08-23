import React, { Component } from "react";
import "./TodoItem.css";

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }

  render() {
    const { text, checked, color, id, onToggle, onRemove } = this.props;
    const style = {
      color: color
    };

    console.log(id); // 리렌더링 최적화 테스트용 코드

    return (
      <div style={style} className="todo-item" onClick={() => onToggle(id)}>
        <div
          className="remove"
          onClick={e => {
            e.stopPropagation(); // 이벤트 확산을 막아주는 기능 : onToggle 까지 실행되는 것을 막기 위해
            onRemove(id);
          }}
        >
          &times; {/* x 마크 삽입 */}
        </div>
        <div className={`todo-text ${checked && "checked"}`}>
          <div>{text}</div>
        </div>
        {checked && <div className="check-mark">&#x2713;</div>}
      </div>
    );
  }
}

export default TodoItem;
