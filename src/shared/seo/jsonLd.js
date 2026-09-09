import { getSiteUrl, siteConfig } from "@/shared/config/site";
import { localizedPath } from "@/shared/i18n/routing";
import { localize } from "@/shared/utils/localize";
import { isConfigured } from "@/shared/utils/placeholder";

export function safeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function websiteJsonLd(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: `${getSiteUrl()}${localizedPath(locale)}`,
    inLanguage: locale,
  };
}

export function personJsonLd(profile, locale) {
  const sameAs = [profile.social.github, profile.social.linkedin, ...profile.social.socialLinks.map((item) => item.url)].filter(isConfigured);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.identity.fullName,
    jobTitle: profile.identity.role,
    description: localize(profile.narrative.shortBio, locale),
    url: `${getSiteUrl()}${localizedPath(locale)}`,
    image: `${getSiteUrl()}${profile.assets.profileImage}`,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function profilePageJsonLd(profile, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: profile.identity.fullName,
    url: `${getSiteUrl()}${localizedPath(locale, "/about")}`,
    inLanguage: locale,
    mainEntity: personJsonLd(profile, locale),
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function projectJsonLd(project, locale, url) {
  return {
    "@context": "https://schema.org",
    "@type": project.links.repositoryUrl && isConfigured(project.links.repositoryUrl) ? "SoftwareSourceCode" : "CreativeWork",
    name: localize(project.title, locale),
    description: localize(project.caseStudy.summary, locale),
    url,
    inLanguage: locale,
    image: project.media.cover ? `${getSiteUrl()}${project.media.cover}` : undefined,
    codeRepository: isConfigured(project.links.repositoryUrl) ? project.links.repositoryUrl : undefined,
  };
}
