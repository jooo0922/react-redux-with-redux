import React, { Component } from "react";
import "./App.css";
import AddNumberRoot from "./components/AddNumberRoot";
import DisplayNumberRoot from "./components/DisplayNumberRoot";

class App extends Component {
  state = {
    number: 0,
  };

  render() {
    return (
      <div className="App">
        <h1>Root</h1>
        <AddNumberRoot></AddNumberRoot>
        <DisplayNumberRoot></DisplayNumberRoot>
      </div>
    );
  }
}

export default App;

/**
 * jsx의 input 태그의 경우 readOnly라는 attribute를 할당하면
 * input 사용자가 태그 안에 값을 수정하지 못하도록 함
 */

/**
 * 하위 컴포넌트들과 데이터를 주고받기 위해서 사용해줬던 props들이 더 이상 필요없어짐.
 */
