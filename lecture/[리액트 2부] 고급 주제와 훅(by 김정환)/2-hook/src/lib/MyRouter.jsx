import React from "react";

const routerContext = React.createContext({});
routerContext.displayName = "RouterContext";

export const Router = () => {
  const [path, setPath] = React.useState(window.location.pathname);

  const changePath = (path) => {
    setPath(path);
    window.history.pushState({ path }, "", path);
  };

  const handlePopState = (e) => {
    const nextPath = e.state && e.state.path;
    if (!nextPath) return;
    setPath(nextPath);
  };

  React.useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    window.history.replaceState({ path }, "");

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [path]);

  const contextValue = {
    path,
    changePath,
  };

  return (
    <routerContext.Provider value={contextValue}>
      {this.props.children}
    </routerContext.Provider>
  );
};

export const Routes = ({ children }) => {
  const { path } = React.useContext(routerContext);

  //? 반환할 리액트 엘리먼트
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
};

/**
 * 사용 예
 * <MyRouter.Route path={"경로"} element={<리액트_앨리먼트 />} />
 */
export const Route = () => null;

export const Link = ({ to, ...rest }) => {
  const { path, changePath } = React.useContext(routerContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (to !== path) changePath(to);
  };

  return <a {...rest} href={to} onClick={handleClick} />;
};
