import { NextResponse } from "next/server";
import { defaultLocale, locales } from "@/shared/i18n/config";

function getPreferredLocale(request) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((entry) => {
      const [tag, qValue] = entry.trim().split(";q=");
      return { language: tag.toLowerCase().split("-")[0], quality: qValue ? Number(qValue) : 1 };
    })
    .filter((item) => locales.includes(item.language) && Number.isFinite(item.quality))
    .sort((a, b) => b.quality - a.quality);

  return ranked[0]?.language || defaultLocale;
}

export function proxy(request) {
  if (request.nextUrl.pathname !== "/") return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/${getPreferredLocale(request)}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/"] };
