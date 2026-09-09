import { getSiteUrl, siteConfig } from "@/shared/config/site";
import { localizedPath } from "@/shared/i18n/routing";

export function absoluteUrl(path = "") {
  if (/^https?:\/\//i.test(path)) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildLocalizedAlternates(path = "") {
  return {
    id: absoluteUrl(localizedPath("id", path)),
    en: absoluteUrl(localizedPath("en", path)),
    "x-default": absoluteUrl(localizedPath("id", path)),
  };
}

export function buildMetadata({ locale, path = "", title, description, image, type = "website" }) {
  const canonical = absoluteUrl(localizedPath(locale, path));
  const socialImage = image || siteConfig.defaultSocialImage;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    authors: [{ name: siteConfig.fullName }],
    creator: siteConfig.fullName,
    publisher: siteConfig.fullName,
    alternates: {
      canonical,
      languages: buildLocalizedAlternates(path),
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: siteConfig.siteName,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? ["en_US"] : ["id_ID"],
      images: socialImage ? [{ url: absoluteUrl(socialImage), width: 1200, height: 630, alt: `${siteConfig.siteName} social preview` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage ? [absoluteUrl(socialImage)] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}
