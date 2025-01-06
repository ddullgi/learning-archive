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
