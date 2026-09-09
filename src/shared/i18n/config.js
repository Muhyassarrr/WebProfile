export const locales = ["id", "en"];
export const defaultLocale = "id";

export function hasLocale(locale) {
  return locales.includes(locale);
}
