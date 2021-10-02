import React, { Component } from "react";
// store 가져왔던 것도 전부 container component에서만 사용할테니 필요 없어짐.

export default class DisplayNumber extends Component {
  render() {
    return (
      <div>
        <h1>Display Number</h1>
        <input type="text" value={this.props.number} readOnly />{" "}
        {this.props.unit}
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
