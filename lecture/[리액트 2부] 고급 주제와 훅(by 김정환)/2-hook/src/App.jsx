// const App = () => <>2-hook</>;

// export default App;

//? 함수 클래스 비교
{
  // import React from "react";
  // function Contract(props) {
  //   const sign = () => {
  //     setTimeout(() => console.log("서명인: ", props.name), 3000);
  //   };
  //   return <button onClick={sign}>서명</button>;
  // }
  // class App extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       name: "사용자1",
  //     };
  //   }
  //   handleChange(e) {
  //     this.setState({ name: e.target.value });
  //   }
  //   render() {
  //     return (
  //       <>
  //         <select value={this.state.name} onChange={this.handleChange.bind(this)}>
  //           <option value="사용자1">사용자1</option>
  //           <option value="사용자2">사용자2</option>
  //         </select>
  //         <Contract name={this.state.name} />
  //       </>
  //     );
  //   }
  // }
  // export default App;
  // function createContract(name) {
  //   const sign = () => {
  //     setTimeout(() => console.log("서명인: ", name), 3000);
  //   };
  //   return {
  //     sign,
  //   };
  // }
  // const contract2 = createContract("사용자 3");
  // contract2.sign();
}

import MyReact from "./lib/MyReact";

function NameField() {
  const [firstname, setFirstname] = MyReact.useName("사용자1");
  const handleChange = (e) => {
    setFirstname(e.target.value);
  };

  return <input value={firstname} onChange={handleChange} />;
}

export default () => <NameField />;
