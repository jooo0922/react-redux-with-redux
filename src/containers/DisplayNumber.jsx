import DisplayNumber from "../components/DisplayNumber"; // 마찬가지로 wrapping 해줄 컴포넌트를 가져옴.
import { connect } from "react-redux";

function mapStateToProps(state) {
  // 이 때, 리턴해주는 객체 안의 key는 전달하려는 리액트 props의 이름과 동일해야 함.
  // 또한 이 함수는 redux store의 state를 인자로 받도록 약속되어 있고,
  // redux store의 state값이 변경될 때마다 호출되도록 약속되어 있기 때문에
  // 리덕스 state의 값을 바로 리액트 props로 때려넣을 수 있게 된 것!
  // 주석처리한 코드처럼 redux의 state값을 가져오려고 빙 돌아서 올 필요가 없는거지!
  return {
    number: state.number,
  };
}

export default connect(mapStateToProps)(DisplayNumber);

/**
 * 이게 좀 낯선 구조인데, connect()를 실행하면 어떤 함수가 리턴되고,
 * 그 함수는  wrapping 해줄 presentational component를 인자로 받으면
 * 그걸 감싸주는 container component 즉, 아래에 주석 처리한 익명 컴포넌트와 동일한 것을 리턴하는 함수임.
 * 이 리턴받은 container component를 export default로 지정한다는 뜻!
 */

/**
 * 이 때, 아주 중요한 포인트!
 *
 * 이 가짜 컴포넌트의 부모 컴포넌트인 DisplayNumberRoot 로부터 unit이라는 props를 전달받았는데,
 * 기존에는 이거를 가짜 컴포넌트의 props로도 전달해줘야
 * 진짜 DisplayNumber 컴포넌트에도 전달이 되서 사용할 수 있었는데,
 *
 * react-redux의 connect() 함수를 사용하면
 * 이러한 작업을 직접 해주지 않아도
 * 부모 컴포넌트로부터 받은 props들을 알아서
 * presentational component 즉, WrappedComponent에 전달해 줌!
 *
 * -> 깃허브에서 react-redux의 초기 코드인 connect.js를 참고할 것!
 */

/**
 * mapStateToProps(), mapDispatchToProps()
 *
 * 이 두 가지 함수는
 * connect(mapStateToProps, mapDispatchToProps)
 * 이런 식으로 connect 함수 자체의 인자로 들어가는 애들임.
 *
 * connect 함수는 기본적으로 인자가 없을 수도 있고, 하나만 있다면 mapStateToProps 라고 보면 됨.
 * 물론 이거는 공식 문서에서 가져온 함수 이름이고, 이름이야 마음대로 지을 수 있는데,
 * 저 이름이 굉장히 헷갈려서 어려워 한다고도 함.
 *
 * 저 이름의 정확한 의미는,
 * map (Redux) State To (React) Props
 * 즉, 리덕스의 state를 리액트의 props에 매핑해준다, 연결시켜준다 라는 뜻이라고 함.
 * 이게 첫 번째 인자로 전달하는 함수가 하는 일!
 *
 * 즉, 이 첫 번째 함수는 주석처리한 코드 상에서
 * store.subscribe()로 구독해놓은 익명함수가 하는 일들,
 * this.setState({ number: store.getState().number } 이걸 해줘서 render 함수가 재호출되고 하는 등
 * 이 일을 해준다고 보면 됨.
 *
 * 마찬가지로
 * map (Redex) Dispatch To (React) Props
 * 도 리덕스의 dispatch를 리액트의 props에 연결해준다는 뜻
 * 근데 이 가짜 컴포넌트에서는 주석처리된 코드를 보면 알겠지만
 * dispatch 해주는 작업이 없기 때문에 이 컴포넌트에서는 필요가 없음
 */

/*
여기에 주석 처리한 부분은 React, Redux 별개의 라이브러리를 이용해서 container component를 구현한 코드이고,
위에 작성한 코드가 react-redux 라이브러리를 이용해서 수정한 코드임!

import React, { Component } from "react";
import store from "../store"; // store에서 state값을 가져오는 작업들을 대신 해줘야하기 때문에 import 함.

export default class extends Component {
  state = {
    number: store.getState().number,
  };

  constructor(props) {
    super(props);

    store.subscribe(
      function () {
        this.setState({ number: store.getState().number });
      }.bind(this)
    );
  }

  render() {
    return (
      <DisplayNumber
        number={this.state.number}
        unit={this.props.unit}
      ></DisplayNumber>
    );
  }
}
*/

/**
 * AddNumber와 마찬가지로 DisplayNumber를 감싸주는
 * container component 즉, 익명 컴포넌트를 만듦.
 *
 * 이 안에서 Redux와 관련된 일들을 모두 처리해주도록 함.
 *
 * DisplayNumber 안에서 store.getState하고 subscribe 처리해주고 이런 것들 죄다 여기로 옮겨왔음.
 * 그리고 state가 변경될 때마다 store로부터 가져와야하는 값인
 * this.state.number만 DisplayNumber의 props로 넘겨주면
 * DisplayNumber 안에서 redux 관련 코드 사용 없이 props만 이용해서 render 를 재호출해서 UI를 다시 그려줄 수 있게 됨.
 */

/**
 * 그런데 이렇게 Redux를 container component로 빼주면,
 * 재사용성은 늘어날 수 있지만, 코드가 너무 많아지지 않나?
 *
 * 만약 unit이라는 props 하나만 DisplayNumberRoot를 통해서 추가하려고 해도,
 * 이전에는 그냥 바로 DisplayNumber로 꽂아주면 되는 것을
 * container component를 거쳐서 전달해줘야 하는 불편함이 생기게 됨.
 *
 * 이러한 문제점들을 해결해주는 것이 react-redux 라는 도구임!
 * 이 수업에서 본격적으로 배우고자 하는 것!
 */
