"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { replaceLocaleInPath } from "./routing";

export function LanguageSwitcher({ locale, label }) {
  const pathname = usePathname();
  return (
    <nav className="language-switcher" aria-label={label}>
      {[
        ["id", "ID"],
        ["en", "EN"],
      ].map(([target, text]) => (
        <Link
          key={target}
          href={replaceLocaleInPath(pathname, target)}
          hrefLang={target}
          lang={target}
          aria-current={locale === target ? "page" : undefined}
          className="language-switcher__link"
        >
          {text}
        </Link>
      ))}
    </nav>
  );
}
