import { isConfigured } from "./placeholder";

export function getExternalHref(value) {
  if (!isConfigured(value)) return null;
  if (/^https?:\/\//i.test(value)) return value;
  return null;
}

export function getPublicHref(value) {
  if (!isConfigured(value)) return null;
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;
  return null;
}

export function getEmailHref(value) {
  if (!isConfigured(value) || !value.includes("@")) return null;
  return `mailto:${value}`;
}
