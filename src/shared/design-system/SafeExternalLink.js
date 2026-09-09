import { getExternalHref } from "@/shared/utils/links";

export function SafeExternalLink({ href, children, className = "text-link" }) {
  const safeHref = getExternalHref(href);
  if (!safeHref) return <span className={`${className} is-placeholder`}>{children}</span>;
  return (
    <a className={className} href={safeHref} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
