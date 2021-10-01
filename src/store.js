import { createStore } from "redux"; // Redux를 npm 패키지로 설치했으므로 메서드들을 import해서 불러와야 함.

// 안에 들어가는 익명함수는 당연히 reducer일 것이고, createStore에 의해 리턴되는 store 를 기본적으로 export 하겠다는거지
export default createStore(function (state, action) {
  if (state === undefined) {
    // 이 조건문은 항상 reducer 함수의 최초 실행 -> 즉, state의 초기값 설정하는 부분이라고 보면 됨
    return {
      number: 0,
    };
  }

  if (action.type === "INCREMENT") {
    // return { number: state.number + action.size }; state가 짧으면 이런 식으로 새로 만들어서 리턴해도 되지만, 길면 원본 state를 복사해서 작업해줘야지!
    // 복사할 때 Object.assign({}, state, 덮어쓰는 객체) 이렇게 해줘도 되지만, 아래와 같이 spread syntax로 object를 복사해주고, 그 뒤에 덮어쓸 property만 써줘도 됨! -> Immutability
    return { ...state, number: state.number + action.size };
  }

  return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 *
 * 이 코드는 뭐냐면 createStore(reducer) 이런 식으로 store를 처음 생성할 때
 * 두 번째 인자로 위의 코드를 넣어주면 웹 브라우저에서 Redux devtools를 사용할 수 있음.
 */
