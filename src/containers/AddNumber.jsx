import React, { Component } from "react";
import AddNumber from "../components/AddNumber"; // 우리가 wrapping 할 컴포넌트를 불러와야 함.
import store from "../store";

export default class extends Component {
  render() {
    return (
      <AddNumber
        onClick={function (size) {
          store.dispatch({ type: "INCREMENT", size: size });
        }.bind(this)}
      ></AddNumber>
    );
  } // wrapping 할 컴포넌트를 리턴해주고 있지?
}

/**
 * AddNumber 컴포넌트를 감쌀 container component를 만듦.
 *
 * 일반적으로 container component는 containers 라는 폴더에 따로 모아서 사용하는 경우가 많음.
 * 또한 이름은 presentational component랑 동일하게 또는 다르게 할 수 있고,
 * 이 컴포넌트가 꼭 하나의 컴포넌트만 1:1로 대응해서 wrapping 할 필요도 없음.
 *
 * 즉, 이 컴포넌트가 여러 개의 리액트 컴포넌트들을 감싸는 역할을 해도 됨.
 * 또한 여기서 redux store 관련 작업만 처리하는 게 아닌 여러 비즈니스 로직도 처리할 수 있는거임.
 */

/**
 * 위에 익명 클래스는 원래의 AddNumber 컴포넌트를 가져와서 그대로 출력해주는 역할을 함.
 * React dev tool로 보면 컴포넌트 구조 상에서 Anonymous 라는 게 새로 생겨나는데
 * 이게 바로 이 익명 클래스를 가리키는 것임.
 *
 * 마치 얘가 AddNumber인 척 하면서 몰래 중간에 끼어든 거라고 보면 됨.
 * 한 마디로 가짜 AddNumber 인 셈!
 *
 * 그래서 이제 Redux와 관련된 모든 일들은 다 얘가 해주는거임.
 * 그리고 기존에 있던 AddNumber라는 오리지널 컴포넌트는 오로지
 * 화면에 뭔가를 표시하는 일에만 집중하는(presentational) 다시 옛날의 역할로 돌아가게 됨.
 *
 * 이렇게 하면 다른 사용자가 컴포넌트를 마음껏 재사용할 수 있겠지! Redux와 관련된 코드가 없어질 테니까
 * -> AddNumber는 더 이상 Redux에 종속되지 않고,
 * 그냥 화면에 뭔가를 표시하는(presentational) 역할만 하는 원래의 컴포넌트로 다시 돌아온 것!
 */
