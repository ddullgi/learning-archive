const Dialog = ({ header, children, footer }) => {
  return (
    <div className="Dialog">
      {header && <header>{header}</header>}
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

export default Dialog;
