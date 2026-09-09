import Link from "next/link";

const variants = {
  primary: "button button--primary",
  secondary: "button button--secondary",
  ghost: "button button--ghost",
};

export function Button({ href, children, variant = "primary", external = false, className = "" }) {
  const classes = `${variants[variant] || variants.primary} ${className}`.trim();
  if (!href) return <span className={`${classes} button--disabled`}>{children}</span>;
  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
