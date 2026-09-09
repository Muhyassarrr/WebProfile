# Architecture

## Goals

This portfolio is designed around four non-negotiable properties: server-rendered public content, strong SEO primitives, low client JavaScript, and centralized content ownership.

## Layering

### `src/app`

Routing and composition only. Pages read local portfolio data through application queries, compose presentation components, and export localized metadata. No page fetches portfolio content from an internal API.

### `src/content`

The source of truth for professional portfolio data. Data is plain JavaScript so it is available synchronously to Server Components and build-time metadata/sitemap generation.

### `src/features/portfolio/infrastructure`

`contentRepository.js` is a deliberately small adapter over local content modules. It gives the application layer a stable boundary without introducing a database/CMS abstraction the project does not need.

### `src/features/portfolio/application`

Contains simple portfolio queries such as `getProjectBySlug()` and `getFeaturedProjects()`. Business/content selection logic lives here rather than inside page components.

### `src/features/portfolio/presentation`

Portfolio-specific visual components such as project cards, timelines, skill groups, breadcrumbs, and case-study sections.

### `src/shared`

Reusable site-level concerns: brand config, design system, i18n, SEO, theme, and small utilities.

## SSR-first decision

Server Components are the default. Home, About, Projects, project details, Experience, Education, Skills, Certifications, Contact, breadcrumbs, structured data, robots, and sitemap render on the server/build output.

Because the content is repository-local and has no request-specific data dependency, Next.js can prerender many routes to HTML at build time. This still satisfies the primary SEO requirement: crawlers receive complete HTML without client-side portfolio data fetching.

## Server / Client boundary

Client Components are intentionally limited to:

- `src/shared/theme/ThemeSwitcher.js`
- `src/shared/i18n/LanguageSwitcher.js`

The header and mobile menu themselves remain server-rendered. The mobile menu uses semantic `<details>/<summary>` instead of a JavaScript menu state dependency.

## Routing and i18n

Supported locales:

- `id`
- `en`

Every localized page lives under `src/app/[locale]`.

`src/proxy.js` follows the Next.js 16 `proxy` convention and only runs for `/`. It performs a small `Accept-Language` negotiation and redirects to `/id` or `/en`; unmatched preferences fall back to Indonesian.

Every localized layout validates the locale. Invalid locales call `notFound()`.

## Language preservation

`LanguageSwitcher` reads the current pathname and replaces only the first locale segment. Therefore:

`/id/projects/replace-me-project-1` → `/en/projects/replace-me-project-1`

It does not send the user back to the homepage.

## Theme architecture

Theme values are `light`, `dark`, and `system`. Preference is stored in `localStorage` and is never part of the URL.

Design tokens are CSS custom properties in `src/app/globals.css`. A tiny inline script in the localized root layout resolves the stored/system preference before visible content to minimize a color flash. When the selected preference is System, the client control listens for operating-system color-scheme changes.

The document uses `suppressHydrationWarning` only on `<html>` because the theme initialization script mutates document data attributes before hydration.

## Content architecture

Identity/brand configuration belongs in `src/shared/config/site.js`; richer professional narrative belongs in `src/content/profile.js`.

Localized narratives use:

```js
{
  id: "...",
  en: "...",
}
```

The UI does not scatter `locale === "id" ? ... : ...` checks across presentation components.

## SEO architecture

`src/shared/seo/metadata.js` centralizes canonical, hreflang, Open Graph, Twitter, and robot defaults.

Each localized page exports `generateMetadata()` and passes its localized title/description and route path to the helper.

`src/shared/seo/jsonLd.js` builds structured data from the same content models. Serialization replaces `<` with `\\u003c` before insertion into an `application/ld+json` script.

`src/app/sitemap.js` includes both locales and project case-study routes with language alternates. `src/app/robots.js` allows production crawling and points to the sitemap.

## Project case studies

Project detail route:

`/[locale]/projects/[slug]`

The page is built from the project model in `src/content/projects.js`. Optional sections are skipped when their value is empty/null. Invalid slugs return Next.js 404 behavior.

## Add a project

1. Open `src/content/projects.js`.
2. Add an object matching the existing schema.
3. Use a unique, stable lowercase slug.
4. Add both `id` and `en` narrative content.
5. Add real cover/thumbnail/gallery assets under `public/`.
6. Set live/repository/documentation URLs only when they really exist.
7. Mark `featured: true` only if the project should appear on Home.
8. Run lint/build and inspect both locale URLs.

No route file change is required.

## Add experience

Add an entry to `src/content/experience.js`. Keep responsibilities, achievements, measurable outcomes, technologies, and an optional related project slug in that one content object.

## Add education

Add an entry to `src/content/education.js`. Do not add GPA, honors, thesis, or achievements unless they are factual.

## Add certification

Add an entry to `src/content/certifications.js`. The initial export is intentionally an empty array. Add only verifiable real credentials.

## Change identity and branding

1. Edit `src/shared/config/site.js` for site name, identity, role, domain, email, social URLs, resume, and top-level assets.
2. Edit `src/content/profile.js` for narrative/professional details.
3. Replace placeholder images/icons under `public/placeholders` and/or update paths.
4. Search the repository for `REPLACE_ME`.

## Change or add a locale

Adding a third locale requires coordinated changes:

1. Add it to `src/shared/i18n/config.js`.
2. Add a dictionary in `src/shared/i18n/dictionaries.js`.
3. Add localized content values.
4. Extend `LanguageSwitcher`.
5. Extend metadata and sitemap alternate-language generation.
6. Extend locale negotiation in `src/proxy.js`.
7. QA every route and metadata output for the new language.

## Why there is no database/API/CMS

The portfolio is content-oriented and changes with repository deployments. A database, API, CMS, auth layer, or client state manager would add operational and hydration cost without solving a requirement in this project.
