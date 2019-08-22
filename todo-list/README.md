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

## #2 상태관리

### 다른 컴포넌트 간에 데이터 주고 받기
예를 들어, `Form(input)`에서 할 일을 작성하고 `TodoItemList(todos)`에 추가한다고 하자.

![피해야 할 방법](https://i.imgur.com/ckmex6Y.png)
<br>각각 데이터를 갖는 방식으로 `Form`에서 만들어진 데이터를 `TodoItemList`로 보내는 방법을 생각할 수 있다. 하지만 이 방법은 구현이 복잡해지고 유지보수가 상당히 어렵다.

![최적의 방법](https://i.imgur.com/nnYKPBo.png)
<br>최적의 방법은 컴포넌트들이 부모를 통해 대화하도록 만드는 것이다.

**어떻게 부모를 통해 대화할까?**
1. `App`에서 `Form`과 `TodoItemList`로 `input`, `todos` 상태를 props로 넣어준다.
2. 해당 데이터들을 업데이트하는 함수들 또한 각 컴포넌트에 props로 전달하여 부모 데이터를 업데이트하도록 한다.

### 이벤트 객체는 많은 것을 담고 있다.
- `onChange`, `onClick`, `onKeyPress` 등의 이벤트 발생 시 `이벤트 객체`가 인자로 전달되며 지정된 함수가 호출된다.
  - `on...`이 이벤트 등록을 의미한다면 이러한 이벤트를 다루기 위해 `handle...`라는 이름을 통상적으로 사용한다.
- `e.target`에는 해당 `input`의 `prop`들이 담겨 있어 `e.target.value`를 통해 `input`의 `value`인 문자열을 얻어낼 수 있다.
- `e.key`에는 발생한 `키보드 이벤트`에 대해 어떤 키가 입력되었는지 정보가 담겨있다.
  - `onKeyPress`라는 `키보드 이벤트`가 발생했을 때 입력된 키가 `Enter`인지 확인하도록 했다.
  ```javascript
  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }
  ```

### 리액트의 배열을 state로 다룰 때 절대로 `push`가 아닌 `concat`을 사용해야 한다!
- 이유 : `setState`에 변경하고자 하는 prop과 값들을 담은 새로운 객체를 전달하면 `state`에서 같은 이름의 prop(`key`)에 대해 `value`를 갈아 끼운다. 하지만 최적화를 위해 값을 비교하여 변경된 값에 대해서만 리렌더링을 진행하게 된다. `push` 명령은 배열을 같은 참조값으로 반환시키기 때문에 리액트가 바뀐 값이라고 인지하지 못하여 값은 업데이트되었지만 리렌더링은 진행되지 않는다.
- `concat`은 새로운 배열을 반환하기 때문에 리액트가 인지할 수 있다.

### 크롬 확장 프로그램 `리액트 개발자 도구` -> F12 -> Components 탭에서 각 컴포넌트에 대한 정보를 상세히 확인할 수 있다.
![리액트개발자도구](https://user-images.githubusercontent.com/47619140/63509606-86eb5480-c517-11e9-8f8e-10cc94bab82c.png)
- 컴포넌트의 `props`, `state`, `context` 전부 확인 가능하다.

### CSS) `opacity` 속성을 통해 `hover` 상태일 때만 화면에 나타나도록 하기
- `opacity` 속성은 `0.0` ~ `1.0`의 범위를 지정할 수 있으며, 기본값으로 `1.0`(불투명도 100%)를 갖는다.
```css
...
.todo-item:hover .remove {
  opacity: 1;
}

.remove {
  margin-right: 1rem;
  color: #e64980;
  font-weight: 600;
  opacity: 0;
}
...
```
- `todo-item`이 `hover` 상태일 때 하위 `.remove` class를 `opacity: 1;`를 통해 불투명도 100%로 지정했다.
- `.remove` class는 보통 상태에서의 스타일을 지정하며 `opacity: 0;`를 통해 완전 투명하게 지정하여 보통 상태에서는 보이지 않도록 지정했다.

### `비구조화 할당`을 유용하게 사용

```javascript
  const todoList = todos.map(({ id, text, checked }) => (
    <TodoItem
    id={id}
    text={text}
    checked={checked}
    onToggle={onToggle}
    onRemove={onRemove}
    key={id}
    />
  ));
```
`todos.map`의 콜백에서 넘겨 받는 파라미터는 `id`, `text`, `checked`를 갖는 `todo`객체지만 각 prop을 `비구조화 할당`으로 직접 넘겨 받도록 했다.

### 배열을 각 요소를 넘기며 자식 컴포넌트들을 렌더링할 때는 `key` prop이 필요하다.
- `key`가 있어야 리액트가 컴포넌트들을 리렌더링할 때 더욱 효율적으로 작동된다. (최적화)
- `map`의 `index`를 `key`로 넘기곤 하지만 권장되는 방법은 아니다..