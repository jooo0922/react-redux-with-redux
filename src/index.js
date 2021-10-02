import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * 기존에 Redux만으로 store를 사용하려면,
 * 그것을 사용하는 컴포넌트들마다 import store from '../store.js'; 이런 식으로 가져와야 했음.
 *
 * 그러나 react-redux의 Provider 컴포넌트를 가져온 뒤,
 * index.js에서 최상위 컴포넌트인 App을 Provider로 감싸주면,
 * 이 App 컴포넌트는 Provider라는 컴포넌트의 맥락 안에서 존재하기 때문에
 * 이 컴포넌트의 지배를 받게 됨.
 *
 * 이 때 Provider는 반드시 store라고 하는 props를 받아야 하는데,
 * 거기에 우리가 기존에 사용하던 store를 넣어주면 되는거임!
 *
 * 이렇게 최상위 컴포넌트에서 한번만 store를 넣어주면
 * 그 다음부터는 하위의 모든 컴포넌트들은
 * Provider에서 공급해 준 store에 접근할 수 있게 됨! 따로 import 하지 않아도!
 */
