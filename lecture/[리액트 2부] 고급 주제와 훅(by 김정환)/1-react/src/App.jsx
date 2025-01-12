import * as MyRouter from "./lib/MyRouter";
import { getComponentName } from "./lib/utils";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";

const App = () => (
  <MyRouter.Router>
    <MyRouter.Routes>
      <MyRouter.Route path="/cart" element={<CartPage />} />
      <MyRouter.Route path="/order" element={<OrderPage />} />
      <MyRouter.Route path="/" element={<ProductPage />} />
    </MyRouter.Routes>
  </MyRouter.Router>
);

// export default App;

//? ref 학습
{
  // import React from "react";
  // class MyComponent extends React.Component {
  //   divRef = React.createRef();
  //   constructor(props) {
  //     super(props);
  //     console.log("constructor", this.divRef);
  //   }
  //   render() {
  //     return <div ref={this.divRef}>div</div>;
  //   }
  //   componentDidMount() {
  //     console.log("componentDidMount", this.divRef);
  //     const divElement = this.divRef.current;
  //     divElement.style.backgroundColor = "red";
  //     divElement.style.height = "100px";
  //     divElement.style.width = "100px";
  //   }
  // }
  // export default MyComponent;
}

//? 이벤트 에미터 학습
{
  // import createEventEmitter from "shared/lib/EventEmitter";
  // const eventEmitter = createEventEmitter(0);
  // const loger = (value) => console.log(value);
  // eventEmitter.on(loger);
  // console.log(eventEmitter.get());
  // eventEmitter.set(1);
  // eventEmitter.set(2);
  // setTimeout(() => eventEmitter.set(10), 3000);
}

//? 컨텍스트 학습
{
  // import MyReact from "./lib/MyReact";
  // import React from "react";
  // const counterContext = MyReact.createContext({
  //   count: 0,
  //   setCount: () => {},
  // });
  // class CountProvider extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       count: 0,
  //     };
  //   }
  //   render() {
  //     const value = {
  //       count: this.state.count,
  //       setCount: (nextValue) => this.setState({ count: nextValue }),
  //     };
  //     return (
  //       <counterContext.Provider value={value}>
  //         {this.props.children}
  //       </counterContext.Provider>
  //     );
  //   }
  // }
  // const Count = () => {
  //   return (
  //     <counterContext.Consumer>
  //       {(value) => <div>{value.count}</div>}
  //     </counterContext.Consumer>
  //   );
  // };
  // const PlussButton = () => {
  //   return (
  //     <counterContext.Consumer>
  //       {(value) => (
  //         <button onClick={() => value.setCount(value.count + 1)}>
  //           + 카운트 올리기
  //         </button>
  //       )}
  //     </counterContext.Consumer>
  //   );
  // };
  // export default () => (
  //   <CountProvider>
  //     <Count />
  //     <PlussButton />
  //   </CountProvider>
  // );
}

//? 고차 컴포넌트 학습
import React from "react";

class Header extends React.Component {
  render() {
    return <header>Header</header>;
  }
}

class Button extends React.Component {
  handleClick = () => {
    this.props.log("클릭");
  };

  render() {
    return <button onClick={this.handleClick}>버튼</button>;
  }
}

const withLogging = (WrappedCompent) => {
  function log(message) {
    console.log(`[${getComponentName(WrappedCompent)}] ${message}`);
  }

  class WithLoging extends React.Component {
    componentDidMount() {
      log("마운트");
    }

    render() {
      const enhancedProps = {
        log,
      };
      return <WrappedCompent {...this.props} {...enhancedProps} />;
    }
  }

  return WithLoging;
};

const EnhancedHeader = withLogging(Header);
const EnhancedButton = withLogging(Button);

export default () => {
  return (
    <div>
      <EnhancedHeader />
      <EnhancedButton />
    </div>
  );
};
