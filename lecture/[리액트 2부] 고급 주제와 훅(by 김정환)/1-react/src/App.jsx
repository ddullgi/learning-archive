import createEventEmitter from "shared/lib/EventEmitter";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    // <ProductPage />
    // <OrderPage />
    <CartPage />
  );
};

export default App;

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

const eventEmitter = createEventEmitter(0);
const loger = (value) => console.log(value);

eventEmitter.on(loger);
console.log(eventEmitter.get());
eventEmitter.set(1);
eventEmitter.set(2);

setTimeout(() => eventEmitter.set(10), 3000);
