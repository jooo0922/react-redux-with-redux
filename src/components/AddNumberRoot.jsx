import React, { Component } from "react";
import AddNumber from "../components/AddNumber";

export default class AddNumberRoot extends Component {
  render() {
    return (
      <div>
        <h1>Add Number Root</h1>
        <AddNumber></AddNumber>
      </div>
    );
  }
}

/**
 * 하위 컴포넌트들과 데이터를 주고받기 위해서 사용해줬던 props들이 더 이상 필요없어짐.
 */
