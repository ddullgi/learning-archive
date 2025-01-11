import React from "react";

export const routerContext = React.createContext({});
routerContext.displayName = "RouterContext";

export const Link = ({ to, ...rest }) => (
  <routerContext.Consumer>
    {({ path, changePath }) => {
      const handleClick = (e) => {
        e.preventDefault();
        if (to !== path) changePath(to);
      };

      return <a {...rest} href={to} onClick={handleClick} />;
    }}
  </routerContext.Consumer>
);

export class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname,
    };
    this.handleChangePath = this.handleChangePath.bind(this);
    this.handleOnPopState = this.handleOnPopState.bind(this);
  }

  handleChangePath(path) {
    this.setState({ path });
    window.history.pushState({ path }, "", path);
  }

  handleOnPopState = (e) => {
    const nextPath = e.state && e.state.path;
    if (!nextPath) return;
    this.setState({ path: nextPath });
  };

  componentDidMount() {
    window.addEventListener("popstate", this.handleOnPopState);
    window.history.replaceState({ path: this.state.path }, "");
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.handleOnPopState);
  }

  render() {
    const contextValue = {
      path: this.state.path,
      changePath: this.handleChangePath,
    };
    return (
      <routerContext.Provider value={contextValue}>
        {this.props.children}
      </routerContext.Provider>
    );
  }
}

export const Routes = ({ children }) => (
  <routerContext.Consumer>
    {({ path }) => {
      let selectedRoute = null;

      React.Children.forEach(children, (child) => {
        //? 리액트 엘리먼트인지 검사
        if (!React.isValidElement(child)) return;

        //? 프래그먼트 검사
        if (child.type === React.Fragment) return;

        //? Route 컴포넌트인지 검사
        if (!child.props.path || !child.props.element) return;

        //? Route에 등록된 컴포넌트가 요청한 경로에 해당하는지 검사한다.
        //? 요청 경로에서 쿼리 문자열을 제거하고 비교한다.
        if (child.props.path !== path.replace(/\?.*$/, "")) return;

        selectedRoute = child.props.element;
      });

      return selectedRoute;
    }}
  </routerContext.Consumer>
);

export const Route = () => null;
