"use client";

import { useEffect, useState } from "react";
import { themeOptions, themeStorageKey } from "./theme";

function resolveTheme(preference) {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(preference) {
  const resolved = resolveTheme(preference);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = resolved;
}

export function ThemeSwitcher({ labels }) {
  const [preference, setPreference] = useState("system");

  useEffect(() => {
    const stored = localStorage.getItem(themeStorageKey);
    const initial = themeOptions.includes(stored) ? stored : "system";
    setPreference(initial);
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const current = localStorage.getItem(themeStorageKey) || "system";
      if (current === "system") applyTheme("system");
    };
    media.addEventListener("change", handleSystemChange);
    return () => media.removeEventListener("change", handleSystemChange);
  }, []);

  const onChange = (event) => {
    const next = event.target.value;
    setPreference(next);
    localStorage.setItem(themeStorageKey, next);
    applyTheme(next);
  };

  return (
    <label className="theme-control">
      <span className="sr-only">{labels.theme}</span>
      <select value={preference} onChange={onChange} aria-label={labels.theme}>
        <option value="system">{labels.system}</option>
        <option value="light">{labels.light}</option>
        <option value="dark">{labels.dark}</option>
      </select>
    </label>
  );
}
