# Production-Oriented Personal Developer Portfolio

A multilingual, multi-theme, content-driven personal developer portfolio built with the Next.js App Router. The repository is intentionally **SSR/Server Component first**, has no database, authentication, CMS, analytics, internal API, or client-side portfolio data fetching.

> This copy has been personalized from the supplied resume. Remaining `REPLACE_ME_*` values are intentionally limited to information/assets not provided yet (such as the production domain and project/profile imagery).

## Stack

- Next.js 16.3.4
- React / React DOM 19.2.7
- Tailwind CSS 4.3.0
- ESLint 9 + `eslint-config-next`
- JavaScript
- npm
- App Router
- `src/` directory

## Requirements

- Node.js 20.9 or newer
- npm 10+ recommended

## Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production workflow:

```bash
npm run lint
npm run build
npm run start
```

Optional combined check:

```bash
npm run check
```

## Environment

Copy `.env.example` to `.env.local` for local production-like configuration:

```env
NEXT_PUBLIC_SITE_URL=https://REPLACE_ME_DOMAIN
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` may stay empty during development.

## Architecture

The project uses pragmatic layered architecture:

- `src/app/` — thin routing, page composition, metadata routes
- `src/content/` — portfolio source of truth
- `src/features/portfolio/application/` — portfolio queries/use-case selectors
- `src/features/portfolio/infrastructure/` — local content repository adapter
- `src/features/portfolio/presentation/` — portfolio-specific UI
- `src/shared/config/` — brand/site configuration
- `src/shared/design-system/` — reusable UI primitives and shell
- `src/shared/i18n/` — locale dictionaries and localized routing
- `src/shared/seo/` — metadata and JSON-LD helpers
- `src/shared/theme/` — Light/Dark/System preference handling
- `src/shared/utils/` — localization, dates, links, placeholder helpers

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## SSR-first / Server Component boundaries

All route pages, project content, experience, education, skills, certifications, breadcrumbs, metadata, sitemap, robots, and JSON-LD are Server Components or server metadata routes.

Only two small interactive pieces are Client Components:

1. `ThemeSwitcher` — persists Light/Dark/System locally and follows OS changes in System mode.
2. `LanguageSwitcher` — reads the current pathname only to preserve the exact page when switching `/id` ↔ `/en`.

No portfolio content is fetched after hydration.

## Routes

- `/` → locale redirect via `src/proxy.js`, default fallback `id`
- `/id`, `/en`
- `/{locale}/about`
- `/{locale}/projects`
- `/{locale}/projects/[slug]`
- `/{locale}/experience`
- `/{locale}/education`
- `/{locale}/skills`
- `/{locale}/certifications`
- `/{locale}/contact`
- `/sitemap.xml`
- `/robots.txt`

## Content editing

Primary data files:

- `src/content/profile.js`
- `src/content/experience.js`
- `src/content/education.js`
- `src/content/skills.js`
- `src/content/projects.js`
- `src/content/certifications.js`

Brand/site identity lives in `src/shared/config/site.js`.

Read [`docs/CONTENT-REFERENCE.md`](docs/CONTENT-REFERENCE.md) before replacing placeholders.

## Adding a project

Add an object to `src/content/projects.js` using the existing project model. Each narrative field is localized:

```js
{
  id: "Konten Bahasa Indonesia",
  en: "English content",
}
```

Keep `slug` stable because it becomes the public case-study URL. The project will automatically be included in static params and the sitemap.

## Branding and assets

Replace:

- `src/shared/config/site.js` identity/URL values
- `public/placeholders/profile-placeholder.svg`
- project screenshots/assets
- placeholder favicon/icon assets
- `public/placeholders/og-placeholder.png`
- resume path/URL

Placeholder assets are deliberately neutral and must not be treated as a real logo or personal photo.

## Localization

URL is the language source of truth:

- Bahasa Indonesia: `/id/...`
- English: `/en/...`

UI strings are centralized in `src/shared/i18n/dictionaries.js`. Narrative portfolio content stores `id` and `en` variants directly in content data.

The language switcher preserves the current route, including project slugs.

## Theme

Theme is not encoded in the URL. Preference is stored in local storage under `portfolio-theme` with values:

- `light`
- `dark`
- `system`

A small inline initialization script runs before visible content to reduce theme flash. System mode subscribes to OS color-scheme changes. CSS design tokens are defined in `src/app/globals.css`.

## SEO

Implemented SEO foundation includes:

- localized metadata using Next.js Metadata API
- self-canonical URLs
- `id`, `en`, and `x-default` hreflang alternates
- Open Graph and Twitter card metadata
- metadataBase
- authors / creator / publisher
- Google Search Console verification environment variable
- localized sitemap alternates
- robots metadata route
- Person, WebSite, ProfilePage, BreadcrumbList, CreativeWork / SoftwareSourceCode JSON-LD
- safe JSON-LD serialization replacing `<` with `\\u003c`
- semantic breadcrumbs
- placeholder favicon/icon/apple icon architecture
- default social preview placeholder

See [`docs/SEO-CHECKLIST.md`](docs/SEO-CHECKLIST.md).

## No analytics / no backend

This repository intentionally does not include:

- Google Analytics / GA4
- Google Tag Manager
- tracking pixels
- analytics consent popup
- database
- authentication
- CMS
- contact form backend
- internal API routes
- PWA/service worker

Contact uses direct mail/social links only.

## Deployment

The project can be deployed to any platform supporting a standard Next.js Node deployment. Configure the production `NEXT_PUBLIC_SITE_URL` before building so canonical URLs, sitemap URLs, and structured data use the real domain.

Before deployment, follow [`docs/PRODUCTION-CHECKLIST.md`](docs/PRODUCTION-CHECKLIST.md).

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/CONTENT-REFERENCE.md`](docs/CONTENT-REFERENCE.md)
- [`docs/SEO-CHECKLIST.md`](docs/SEO-CHECKLIST.md)
- [`docs/PRODUCTION-CHECKLIST.md`](docs/PRODUCTION-CHECKLIST.md)
- [`docs/VALIDATION.md`](docs/VALIDATION.md) — generation-environment validation status and network limitation
