# 알게된 내용

## #1 컴포넌트 구성하기

### Template 컴포넌트 사용
- `props`를 파라미터로 받는 대신 `비구조화 할당` 방식으로 `{form, children}`을 직접 할당 받는다.
- 넘겨 받은 `form`과 `children`은 JSX 형태로 부모 컴포넌트에서 전달할 것
```HTML
<TodoListTemplate form={<div>이렇게 말이죠.</div>}>
    <div>여기엔 children 자리구요.</div>
</TodoListTemplate>
```
부모 컴포넌트에서 `TodoListTemplate`를 호출하면 `form` prop과 `TodoListTemplate` 태그 하위의 내용이 `children` prop으로 전달된다.

- `Template 컴포넌트`는 컴포넌트의 사이즈가 커질 때 `모듈화`하기 위해 사용된다.
  - 작은 요소를 분리해서 만든 것이 템플릿이 아니라 반대로 작은 요소를 담기 위해 큰 틀을 만들어둔다고 생각하면 된다.
- 중요한 것은 `JSX`를 props로 전달할 수 있다는 것이다!

### (CSS) `rem` 단위는 문서의 최상위 요소, 즉 html 요소의 크기의 몇 배인지 크기를 지정한다.
- `em`과 `rem`은 `상대 크기`를 지정하는 속성이다.
- `em`은 상위 요소를 기준으로 상대 크기를 지정한다.

### (CSS) `virtual DOM`이 아닌 실제 `DOM`의 `body`는 `index.html`에 있다. 그러므로 컴포넌트가 아닌 배경(?) 스타일은 `index.css`에서 정의한다.
- 배경 색을 `index.css`에서 지정

### 리액트에서 각 컴포넌트를 구현할 때의 개발 흐름
![컴포넌트 개발 흐름](https://i.imgur.com/2K065x6.png)

### (CSS) `flex` 개념 공부하기

### TodoItem 컴포넌트를 담기 위해 TodoItemList 컴포넌트를 만든다.
- `TodoItemList`는 `App`에 의해 호출될 것이고 `TodoItem` 컴포넌트를 자식으로 관리해야 하므로 무언가 중간 역할을 수행하게 된다.
  - 함수, 데이터 등을 `App`으로 부터 넘겨 받고, `TodoItem`으로 넘겨주는 등의 기능을 수행할 것이다.
  - 중간 역할 만을 수행하므로 따로 css 스타일링이 필요없다.

### TodoItem의 구조
```javascript
class TodoItem extends Component {
  render() {
    const { text, checked, id, onToggle, onRemove } = this.props;

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
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
        {checked && <div className="check-mark">✓</div>}
      </div>
    );
  }
}
```

- `todolist`에서 하나의 리스트를 표현하는 기능을 한다.
- 부모 컴포넌트로 부터 `text`, `checked`(체크 여부)를 넘녀 받아 각 리스트가 다르게 표현되며, `id`, `onToggle`, `onRemove`도 넘겨 받아 각 리스트 자신의 고유 `id`를 통해 `onToggle`, `onRemove` 함수를 실행시킨다.
- `HTML`문법으로 유니코드 문자를 표현할수 있다. [예시](https://www.w3schools.com/charsets/ref_html_entities_4.asp)
- `short-circuit`이라는 언어적 특성을 활용하여 (`&&` 연산에서 왼쪽이 `true`일 때만 오른쪽 구문으로 넘어감) `className`을 다르게 지정하도록 했다.
- `e.stopPropagation()`를 통해 이벤트의 확산을 멈춤
  - 필요한 이유 : `× 버튼(className="remove")`에 대한 JSX 태그인 `div`는 `onClick` prop을 갖고, 상위 태그인 `className="todo-item"`에 대한 `div`에도 `onClick` prop이 존재하기 때문에 하위 태그가 클릭되면 상위 태그의 `onClick`이벤트 또한 함께 발생한다. 그래서 `remove` 버튼이 클릭되었을 때는 해당 기능만 동작하도록 하기 위해서 `발생한 이벤트를 우선 정지시켜 버리는 방법`을 사용한다. 이후 해당 기능에 대한 함수만을 다시 호출하는 방식을 통해 `remove`에 대한 이벤트를 처리했다.