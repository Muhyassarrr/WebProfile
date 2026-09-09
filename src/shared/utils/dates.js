import { isPlaceholder } from "./placeholder";

export function formatDate(value, locale = "id", options = {}) {
  if (!value || isPlaceholder(value)) return value || "";
  if (/^\d{4}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    year: "numeric",
    month: "short",
    ...options,
  }).format(date);
}

export function formatDateRange(startDate, endDate, current, locale, currentLabel) {
  const start = formatDate(startDate, locale);
  const end = current ? currentLabel : formatDate(endDate, locale);
  return [start, end].filter(Boolean).join(" — ");
}
