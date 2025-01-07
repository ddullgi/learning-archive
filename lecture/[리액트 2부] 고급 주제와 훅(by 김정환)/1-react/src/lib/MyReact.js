import React from "react";
import createEventEmitter from "shared/lib/EventEmitter";

const MyReact = (function () {
  function createContext(initialValue) {
    const emmiter = createEventEmitter(initialValue);

    class Provider extends React.Component {
      componentDidMount() {
        console.log("[Provider] componentMount before set", emmiter.get());
        emmiter.set(this.props.value);
        console.log("[Provider] componentMount after set", emmiter.get());
      }

      componentDidUpdate() {
        console.log("[Provider] componentUpadate before set", emmiter.get());
        emmiter.set(this.props.value);
        console.log("[Provider] componentUpadate after set", emmiter.get());
      }

      render() {
        return <>{this.props.children}</>;
      }
    }

    class Consumer extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: emmiter.get(),
        };
        this.setValue = this.setValue.bind(this);
      }

      setValue(nextValue) {
        this.setState({ value: nextValue });
      }

      componentDidMount() {
        emmiter.on(this.setValue);
      }

      componentWillUnmount() {
        emmiter.off(this.setValue);
      }

      render() {
        return <>{this.props.children(this.state.value)}</>;
      }
    }

    return { Provider, Consumer };
  }

  return { createContext };
})();

export default MyReact;
