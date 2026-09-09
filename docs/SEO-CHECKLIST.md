# SEO Checklist

## Domain and environment

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the exact production origin, including `https://`.
- [ ] Ensure only one preferred host form is used (for example, decide www vs non-www at the hosting layer).
- [ ] Search for `REPLACE_ME` before launch.

## Google Search Console

1. Deploy the production site.
2. Open Google Search Console.
3. Add the production property/domain.
4. Obtain the verification token appropriate to your chosen verification method.
5. If using the HTML meta verification token supported here, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in the production environment and redeploy.
6. Confirm ownership.
7. Submit `https://YOUR_DOMAIN/sitemap.xml`.
8. Inspect representative `/id/...` and `/en/...` URLs.

- [ ] Search Console verified.
- [ ] Sitemap submitted.
- [ ] No important indexing/crawl errors.

## Sitemap and robots

- [ ] `/sitemap.xml` returns 200.
- [ ] Both `/id` and `/en` route families are present.
- [ ] All real project case-study URLs are present.
- [ ] Alternate language URLs are correct.
- [ ] `/robots.txt` returns 200.
- [ ] Production crawling is allowed.
- [ ] Sitemap URL in robots matches production domain.

## Canonical

- [ ] Every localized page has a self-referencing canonical.
- [ ] `/id/...` does not canonicalize to `/en/...`.
- [ ] `/en/...` does not canonicalize to `/id/...`.
- [ ] Canonicals are absolute HTTPS URLs.

## Hreflang

- [ ] Every localized page exposes `id` alternate.
- [ ] Every localized page exposes `en` alternate.
- [ ] Every localized page exposes `x-default` pointing to the Indonesian fallback.
- [ ] Project case-study alternates preserve the same slug.
- [ ] Hreflang URLs are reciprocal.

## Metadata

- [ ] Unique localized title for Home.
- [ ] Unique localized title for About.
- [ ] Unique localized title for Projects.
- [ ] Unique title for every real project case study.
- [ ] Localized descriptions are useful and not keyword-stuffed.
- [ ] Author/creator/publisher values are real.
- [ ] No `REPLACE_ME` remains in production metadata.

## Open Graph / Twitter

- [ ] Replace default social image.
- [ ] Use 1200×630 image where practical.
- [ ] Add project-specific social images for important case studies.
- [ ] Test social previews on target platforms.
- [ ] Titles/descriptions match the page language.

## Structured data

- [ ] Person data is factual.
- [ ] WebSite data uses production origin.
- [ ] ProfilePage points to the real About page.
- [ ] BreadcrumbList matches visible breadcrumbs.
- [ ] Project CreativeWork/SoftwareSourceCode data matches visible project data.
- [ ] No fake awards, reviews, ratings, clients, or statistics.
- [ ] Validate with Schema Markup Validator.
- [ ] Validate relevant supported types with Google Rich Results Test.

## Image SEO

- [ ] Replace all placeholder images.
- [ ] Every meaningful image has accurate alt text.
- [ ] Decorative images use empty alt text.
- [ ] Width/height/aspect ratio prevents layout shifts.
- [ ] Hero/LCP image loading is intentional.
- [ ] Below-the-fold gallery images remain lazy by default.

## Favicon and identity

- [ ] Replace favicon.
- [ ] Replace app icon.
- [ ] Replace Apple icon.
- [ ] Confirm browser tab icon.
- [ ] Confirm mobile bookmark icon if relevant.

## Performance

- [ ] Production build succeeds.
- [ ] No unnecessary third-party JavaScript.
- [ ] No client-side fetch for local portfolio content.
- [ ] Optimize real project images.
- [ ] Run Lighthouse/PageSpeed on representative pages after deployment.
- [ ] Review LCP, CLS, INP.

## Accessibility as SEO quality foundation

- [ ] One clear H1 per page.
- [ ] Heading levels are logical.
- [ ] Semantic landmarks exist.
- [ ] Navigation works with keyboard.
- [ ] Focus indicators are visible.
- [ ] Color contrast is sufficient in both themes.
- [ ] Reduced-motion preference is respected.

## Links and indexing

- [ ] No broken internal links.
- [ ] No placeholder external links are published.
- [ ] GitHub/LinkedIn/live/repository links point to intended destinations.
- [ ] Important content is linked through normal `<a>`/Next `<Link>` elements.
- [ ] Check indexed pages after launch and remove accidental duplicates at the hosting/router level.
