import "../globals.css";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/shared/design-system/SiteFooter";
import { SiteHeader } from "@/shared/design-system/SiteHeader";
import { siteConfig, getSiteUrl } from "@/shared/config/site";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { hasLocale, locales } from "@/shared/i18n/config";
import { themeInitScript } from "@/shared/theme/theme";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: dict.seo.home.title,
      template: `%s | ${siteConfig.siteName}`,
    },
    description: dict.seo.home.description,
    applicationName: siteConfig.siteName,
    referrer: "origin-when-cross-origin",
    verification: siteConfig.googleSiteVerification ? { google: siteConfig.googleSiteVerification } : undefined,
    icons: {
      icon: [{ url: siteConfig.favicon, type: "image/svg+xml" }],
      apple: [{ url: siteConfig.appleIcon, sizes: "180x180", type: "image/png" }],
    },
  };
}

export const viewport = { colorScheme: "light dark" };

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">{dict.common.skipToContent}</a>
        <SiteHeader locale={locale} dict={dict} />
        {children}
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
