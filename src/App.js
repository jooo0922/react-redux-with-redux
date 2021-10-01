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
        <AddNumberRoot
          onClick={function (size) {
            this.setState({ number: this.state.number + size });
          }.bind(this)}
        ></AddNumberRoot>
        <DisplayNumberRoot number={this.state.number}></DisplayNumberRoot>
      </div>
    );
  }
}

export default App;

/**
 * jsx의 input 태그의 경우 readOnly라는 attribute를 할당하면
 * input 사용자가 태그 안에 값을 수정하지 못하도록 함
 */
