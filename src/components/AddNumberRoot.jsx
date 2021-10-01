import React, { Component } from "react";
// import AddNumber from "../components/AddNumber";
import AddNumber from "../containers/AddNumber"; // 리턴해줄 하위노드를 AddNumber를 감싸는 container component로 바꿔치기해서 가져옴

export default class AddNumberRoot extends Component {
  render() {
    return (
      <div>
        <h1>Add Number Root</h1>
        <AddNumber></AddNumber>
      </div>
    ); // 여기서 사용하는 <AddNumber>는 containers/AddNumber.js 에 있는 익명 클래스로 바꿔치기됨. 말하자면 리액트를 교묘하게 속인 것! -> 그래도 제대로 동작함
  }
}

/**
 * 하위 컴포넌트들과 데이터를 주고받기 위해서 사용해줬던 props들이 더 이상 필요없어짐.
 */
