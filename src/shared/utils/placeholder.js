export function isPlaceholder(value) {
  return typeof value === "string" && value.includes("REPLACE_ME");
}

export function isConfigured(value) {
  return Boolean(value) && !isPlaceholder(value);
}
