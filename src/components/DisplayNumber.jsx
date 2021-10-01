import React, { Component } from "react";
import store from "../store"; // 여 store에서 바로 변경된 state값을 가져와서 사용하려는 것!

export default class DisplayNumber extends Component {
  // 아예 DisplayNumber 컴포넌트에서 자체적인 state를 하나 파서 운영할거임.
  state = {
    number: store.getState().number, // 그래서 state의 초기값도 그냥 store에서 바로 가져와서 사용함.
  };

  // store의 state값이 변경되었다는 걸 통보받기 위해 constructor를 사용함.
  constructor(props) {
    super(props); // constructor는 이거를 무조건 실행시켜주게 되어있음! 리액트가 정한 약속!

    // store의 state값이 변경될 때마다 호출할 함수를 등록한 것. -> 이 등록된 함수에서 DisplayNumber의 state값을 바꿔주면 되겠지?
    store.subscribe(
      function () {
        this.setState({ number: store.getState().number }); // DisplayNumber의 state가 짧으니 새로운 객체를 만들어서 state를 변경해줬음.
      }.bind(this)
    ); // 여기서 바인딩해준 this는 DisplayNumber 컴포넌트를 바인딩 한거지?
  }

  render() {
    return (
      <div>
        <h1>Display Number</h1>
        <input type="text" value={this.state.number} readOnly />
      </div>
    );
  }
}

/**
 * AddNumber 컴포넌트에서 입력값을 통해 redux store의 state값을 변경하도록 코드를 수정했음.
 *
 * 따라서 DisplayNumber도 이제는 더 이상 props를 통해 최상위 컴포넌트의 state값을 가져오는 게 아닌,
 * redux store에 저장된 state값을 바로 가져와서 사용할 수 있도록 수정해줄거임.
 */

/**
 * AddNumber에서 + 버튼을 누름으로써 store의 state값이 바뀌었음에도,
 * DisplayNumber의 텍스트필드 value가 변경되지 않는 이유? 이걸 해결하려면 어떻게 해야 할까?
 *
 * UI가 바뀌지 않는 이유는 단 하나, render()가 다시 새로 호출될 근거가 없기 때문...
 * 이 근거를 만들어주려면 어떻게 해야 하나? DisplayNumber 컴포넌트의 state의 값이 바뀌어야겠지!
 *
 * 그러려면 먼저 DisplayNumber에서 'store의 state값이 변경되었다는 통보'를 받아야 함.
 * 이 통보를 받았을 때 DisplayNumber의 state값을 바꿔주면,
 * render 메서드가 다시 호출될 것임!
 *
 * -> 이렇게 구조를 짜주면 DisplayNumber의 depth가 3단계가 아니라 1억 단계라고 해도
 * 얘는 redux store와 직접 연결되기 때문에 store의 state가 변경되면
 * store.subscribe로 등록된 함수가 존재하는 모든 컴포넌트가 새로 render를 호출하면서 다시 그려지게 됨!
 */
