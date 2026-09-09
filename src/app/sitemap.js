import { getProjects } from "@/features/portfolio/application/portfolio";
import { getSiteUrl } from "@/shared/config/site";
import { locales } from "@/shared/i18n/config";
import { localizedPath } from "@/shared/i18n/routing";

const staticPaths = ["", "/about", "/projects", "/experience", "/education", "/skills", "/certifications", "/contact"];

function absolute(path) {
  return `${getSiteUrl()}${path}`;
}

function alternates(path) {
  return {
    languages: {
      id: absolute(localizedPath("id", path)),
      en: absolute(localizedPath("en", path)),
      "x-default": absolute(localizedPath("id", path)),
    },
  };
}

export default function sitemap() {
  const staticEntries = staticPaths.flatMap((path) => locales.map((locale) => ({
    url: absolute(localizedPath(locale, path)),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.7,
    alternates: alternates(path),
  })));

  const projectEntries = getProjects().flatMap((project) => locales.map((locale) => {
    const path = `/projects/${project.slug}`;
    return {
      url: absolute(localizedPath(locale, path)),
      changeFrequency: "monthly",
      priority: project.featured ? 0.85 : 0.75,
      alternates: alternates(path),
    };
  }));

  return [...staticEntries, ...projectEntries];
}
