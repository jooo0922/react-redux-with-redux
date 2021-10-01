import React, { Component } from "react";
import DisplayNumber from "../components/DisplayNumber"; // 마찬가지로 wrapping 해줄 컴포넌트를 가져옴.
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
    return <DisplayNumber number={this.state.number}></DisplayNumber>;
  }
}

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
