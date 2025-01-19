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

//? useState 구현
{
  // import MyReact from "./lib/MyReact";
  // function NameField() {
  //   const [firstname, setFirstname] = MyReact.useState("사용자1");
  //   const [lastname, setLastname] = MyReact.useState("김");
  //   const handleChangeFirstname = (e) => {
  //     setFirstname(e.target.value);
  //   };
  //   const handleChangeLastname = (e) => {
  //     setLastname(e.target.value);
  //   };
  //   return (
  //     <>
  //       <input value={firstname} onChange={handleChangeFirstname} />
  //       <input value={lastname} onChange={handleChangeLastname} />
  //     </>
  //   );
  // }
  // export default () => <NameField />;
}

import React from "react";
import MyReact from "./lib/MyReact";

const Counter = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  const handleClick = () => setCount(count + 1);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  MyReact.useEffect(() => {
    document.title = `count: ${count}`;
    console.log("effect1");
  }, count);

  console.log("Counter rendered");

  return (
    <>
      <button onClick={handleClick}>더하기</button>
      <input value={name} onChange={handleChangeName} />
    </>
  );
};

export default Counter;
