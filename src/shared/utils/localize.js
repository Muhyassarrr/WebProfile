export function localize(value, locale) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return value;
  if (Array.isArray(value)) return value;
  return value[locale] ?? value.id ?? value.en ?? "";
}

export function localizeList(value, locale) {
  const localized = localize(value, locale);
  return Array.isArray(localized) ? localized.filter(Boolean) : localized ? [localized] : [];
}
