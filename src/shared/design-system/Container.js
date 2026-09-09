export function Container({ as: Component = "div", className = "", children }) {
  return <Component className={`container-shell ${className}`.trim()}>{children}</Component>;
}
