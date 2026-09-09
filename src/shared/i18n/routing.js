import { defaultLocale, hasLocale } from "./config";

export function localizedPath(locale, path = "") {
  const safeLocale = hasLocale(locale) ? locale : defaultLocale;
  const normalized = path && path !== "/" ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `/${safeLocale}${normalized}`;
}

export function replaceLocaleInPath(pathname, locale) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && hasLocale(segments[0])) segments[0] = locale;
  else segments.unshift(locale);
  return `/${segments.join("/")}`;
}
