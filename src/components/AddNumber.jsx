import React, { Component } from "react";

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
            this.props.onClick(this.state.size);
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
