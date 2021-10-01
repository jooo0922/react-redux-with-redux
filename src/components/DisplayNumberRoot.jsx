import React, { Component } from "react";
import DisplayNumber from "../containers/DisplayNumber"; // container component로 바꿔치기해서 가짜 DisplayNumber를 사용하려는 것!

export default class DisplayNumberRoot extends Component {
  render() {
    return (
      <div>
        <h1>Display Number Root</h1>
        <DisplayNumber></DisplayNumber>
      </div>
    );
  }
}

/**
 * 하위 컴포넌트들과 데이터를 주고받기 위해서 사용해줬던 props들이 더 이상 필요없어짐.
 */
