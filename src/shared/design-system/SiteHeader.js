import Link from "next/link";
import { primaryNavigation } from "@/content/navigation";
import { siteConfig } from "@/shared/config/site";
import { LanguageSwitcher } from "@/shared/i18n/LanguageSwitcher";
import { localizedPath } from "@/shared/i18n/routing";
import { ThemeSwitcher } from "@/shared/theme/ThemeSwitcher";

export function SiteHeader({ locale, dict }) {
  return (
    <header className="site-header">
      <div className="container-shell site-header__inner">
        <Link href={localizedPath(locale)} className="brand-link" aria-label={`${siteConfig.siteName} — ${dict.nav.home}`}>
          <span className="brand-mark" aria-hidden="true">&lt;/&gt;</span>
          <span className="brand-copy">
            <strong>{siteConfig.shortName}</strong>
            <span>{siteConfig.role}</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link key={item.key} href={localizedPath(locale, item.href)}>{dict.nav[item.key]}</Link>
          ))}
        </nav>

        <div className="site-header__controls desktop-controls">
          <LanguageSwitcher locale={locale} label={dict.common.language} />
          <ThemeSwitcher labels={dict.common} />
        </div>

        <details className="mobile-menu">
          <summary>{dict.common.menu}</summary>
          <div className="mobile-menu__panel">
            <nav aria-label="Mobile navigation">
              {primaryNavigation.map((item) => (
                <Link key={item.key} href={localizedPath(locale, item.href)}>{dict.nav[item.key]}</Link>
              ))}
            </nav>
            <div className="mobile-menu__controls">
              <LanguageSwitcher locale={locale} label={dict.common.language} />
              <ThemeSwitcher labels={dict.common} />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
