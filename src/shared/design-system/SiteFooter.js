import Link from "next/link";
import { primaryNavigation, secondaryNavigation } from "@/content/navigation";
import { siteConfig } from "@/shared/config/site";
import { localizedPath } from "@/shared/i18n/routing";
import { getEmailHref, getExternalHref } from "@/shared/utils/links";

export function SiteFooter({ locale, dict }) {
  const emailHref = getEmailHref(siteConfig.email);
  const githubHref = getExternalHref(siteConfig.github);
  const linkedinHref = getExternalHref(siteConfig.linkedin);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-shell site-footer__grid">
        <div className="site-footer__brand">
          <p className="eyebrow">{siteConfig.siteName}</p>
          <h2>{siteConfig.shortName}</h2>
          <p>{siteConfig.role} · {siteConfig.location}</p>
        </div>
        <nav aria-label="Footer primary">
          <h3>{dict.footer.navigation}</h3>
          {primaryNavigation.map((item) => <Link key={item.key} href={localizedPath(locale, item.href)}>{dict.nav[item.key]}</Link>)}
        </nav>
        <nav aria-label="Footer secondary">
          <h3>{dict.footer.profile}</h3>
          {secondaryNavigation.map((item) => <Link key={item.key} href={localizedPath(locale, item.href)}>{dict.nav[item.key]}</Link>)}
        </nav>
        <div className="site-footer__contact">
          <h3>{dict.nav.contact}</h3>
          {emailHref ? <a href={emailHref}>{siteConfig.email}</a> : <span className="is-placeholder">{siteConfig.email}</span>}
          {githubHref ? <a href={githubHref} target="_blank" rel="noreferrer">GitHub</a> : <span className="is-placeholder">{siteConfig.github}</span>}
          {linkedinHref ? <a href={linkedinHref} target="_blank" rel="noreferrer">LinkedIn</a> : <span className="is-placeholder">{siteConfig.linkedin}</span>}
        </div>
      </div>
      <div className="container-shell site-footer__bottom">
        <p>© {year} {siteConfig.fullName}. {dict.footer.rights}</p>
        <p>{dict.footer.privacyLine}</p>
      </div>
    </footer>
  );
}
