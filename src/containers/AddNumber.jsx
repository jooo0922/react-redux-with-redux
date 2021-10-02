import AddNumber from "../components/AddNumber"; // 우리가 wrapping 할 컴포넌트를 불러와야 함.
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  // 이 때, WrappedComponent에서의
  // dispatch 작업을 해주는 이벤트핸들러 함수를 할당받는 이벤트 props의 이름을
  // 리턴해주는 객체의 key로 써줘야 함.
  // 그 value는 이벤트핸들러 함수를 줘야 함.
  // 이 때, Provider에서 글로벌하게 공급받은 store를 사용해서 dispatch 메서드를 호출하지 말고,
  // mapDispatchToProps(dispatch) 함수가 인자로 전달받는 dispatch를 사용하도록 약속되어 있음!
  return {
    onClick: function (size) {
      dispatch({ type: "INCREMENT", size: size });
    },
  };
}

export default connect(null, mapDispatchToProps)(AddNumber);

/**
 * 이 connect() 함수가 리턴해주는 함수에 AddNumber를 전달하면
 * 알아서 가짜 컴포넌트(container component) 생성해주고,
 * 부모 컴포넌트로부터 받아와야 할 props도 알아서 presentational component에 전달해 줌.
 *
 * 또한 DisplayNumber의 container component 에서와는 다르게
 * connect() 함수에 전달해주는 두 개의 함수 인자 중에서
 * mapStateToProps()는 필요없음.
 * 왜냐면 주석처리된 코드에서 Redux store의 state값을 가져오지 않으니
 * 그런 작업을 해줄 필요가 없지 -> 이럴 경우 첫 번째 인자는 그냥 null로 넣어주면 됨.
 *
 * 대신 이벤트 props(onClick) 에서 store.dispatch() 로
 * 액션 객체를 store에 보내주는 작업을 하고 있으니
 * mapDispatchToProps() 함수를 정의해서 두 번째 인자로 넣어줘야겠지
 * 얘는 Redux의 Dispatch 메서드를 React의 이벤트 Props 로 연결시켜서
 * 그 안에서 사용할 수 있도록 해주는 함수임.
 */

/*
react-redux 라이브러리 사용 시 필요없는 코드이므로 주석 처리함.

import React, { Component } from "react";
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
*/

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
