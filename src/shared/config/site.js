const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteConfig = {
  siteName: "Muh. Yassar Nurfajri Dharmawan — Portfolio",
  fullName: "Muh. Yassar Nurfajri Dharmawan",
  shortName: "Muh. Yassar Nurfajri Dharmawan",
  role: "Fullstack Developer | Mobile Developer | Data Analyst",
  domain: envSiteUrl || "https://REPLACE_ME_DOMAIN",
  email: "muhyassarnurfajrid@gmail.com",
  location: "Makassar, South Sulawesi, Indonesia",
  github: "https://github.com/Muhyassarrr",
  linkedin: "https://linkedin.com/in/muhyassarnd",
  resume: "/resume/muh-yassar-nurfajri-dharmawan-resume.pdf",
  logo: "/placeholders/icon-placeholder.svg",
  favicon: "/placeholders/favicon-placeholder.svg",
  appleIcon: "/placeholders/apple-icon-placeholder.png",
  defaultSocialImage: "/placeholders/og-placeholder.png",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
};

export function getSiteUrl() {
  return siteConfig.domain.replace(/\/$/, "");
}
