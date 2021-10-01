import React, { Component } from "react";
import store from "../store"; // store.js 파일에서 export한 store 객체를 가져온 것.
// 왜? 입력값으로 인해 AddNumber의 state에 변화가 생길 때마다
// Redux store로 변화된 state값을 바로 쏴줘서 그 안의 state를 변경시키려고!

export default class AddNumber extends Component {
  state = { size: 1 };
  render() {
    return (
      <div>
        <h1>Add Number</h1>
        <input
          type="button"
          value="+"
          onClick={function () {
            store.dispatch({ type: "INCREMENT", size: this.state.size }); // 변경된 this.state.size 값을 action 객체에 담아서 store의 reducer 함수로 쏴줌
          }.bind(this)}
        />
        <input
          type="text"
          value={this.state.size}
          onChange={function (e) {
            this.setState({ size: Number(e.target.value) });
          }.bind(this)}
        />
      </div>
    );
  }
}

/**
 * input 태그의 텍스트필드에 입력값으로 받아온 데이터들은 '문자열'이기 때문에
 * 만약 해당 문자열을 숫자로 변환하지 않은 채 setState()로 저장해버리면,
 * AddNumber 컴포넌트의 state에 저장되는 값들은 숫자가 아닌 '문자열'이 되어버림.
 *
 * 따라서 this.state.size의 값을 App 컴포넌트로 가져가서 숫자로써 계산을 할거면,
 * 텍스트필드에서 입력받은 문자열들을 Number(e.target.value) 를 이용해서 숫자로 바꾼 다음,
 * this.setState()를 이용해서 state에 '숫자값'을 넣도록 해줘야 함!
 */

/**
 * 이 컴포넌트에서 + 버튼을 눌렀을 때 텍스트필드에 입력받은 숫자가
 * AddNumber의 this.state.size값을 this.setState를 통해서 변경시키면,
 * 이 변경된 state값을 이벤트 props를 통해 상위 컴포넌트의 state까지 타고 올라가는 방식이 아니라,
 * (this.props.onClick(this.state.size); -> 이런 식으로 안할거라는 뜻.)
 *
 * 중앙에 위치한 Redux store로 변경된 AddNumber의 state값을 바로 보낸 뒤,
 * 그걸 이용해서 Redux store안의 state값을 변경시키는 방식으로 수정할거임!
 *
 * -> 이렇게 구조를 짜주면 AddNumber의 depth가 3단계가 아니라 1억 단계라고 해도
 * 얘는 redux store와 직접 연결되기 때문에 store의 state를 바로 변경할 수 있음.
 */

/**
 * 다만 Redux를 사용해서 React 컴포넌트들의 state를 관리하면 문제점이 하나 생김.
 *
 * React 컴포넌트는 Redux를 사용하기 전에는 다른 사용자가 컴포넌트를 얼마든지 재사용할 수 있음.
 * 왜냐면, 그냥 해당 컴포넌트의 props에 핸들러나 값을 할당해주기만 하면 되니까.
 *
 * 그런데 Redux를 통해서 상태관리를 하는 컴포넌트들은
 * 'store.dispatch()' 이런 식으로 우리가 만든 store와 그 메서드에 종속된 코드를 사용하기 때문에
 * 우리가 만든 store가 다른 사용자에게 없다면 재사용성이 현저히 떨어지게 됨.
 *
 * 이를 해결하기 위한 방법으로 'Wrapping'을 할 수 있음!
 * 즉, store를 사용하는 컴포넌트(AddNumber)를 감싸는 컴포넌트를 하나 만드는거임.
 * -> container component 라고 함!
 *
 * 그래서 그 컴포넌트는 redux의 store를 핸들링하는 컴포넌트로 만들고,
 * AddNumber 라는 컴포넌트는 redux라는 것이 이 세상에 있다는 걸 모르는 컴포넌트로 만드는 거임!
 * -> presentational component 라고 함!
 */
