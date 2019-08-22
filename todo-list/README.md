# 알게된 내용

## #1 컴포넌트 구성하기

### Template 컴포넌트 사용
- `props`를 파라미터로 받는 대신 `비구조화 할당` 방식으로 `{form, children}`을 직접 할당 받는다.
- 넘겨 받은 `form`과 `children`은 JSX 형태로 부모 컴포넌트에서 전달할 것
```javascript
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