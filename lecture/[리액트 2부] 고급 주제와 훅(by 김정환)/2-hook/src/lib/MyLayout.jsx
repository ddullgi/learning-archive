import React from "react";

export const layoutContext = React.createContext({});
layoutContext.displayName = "LayoutContext";

export const Layout = ({ children }) => {
  const [dialog, setDialog] = React.useState();

  const value = {
    dialog: dialog,
    setDialog: setDialog,
  };

  return (
    <layoutContext.Provider value={value}>{children}</layoutContext.Provider>
  );
};
