# Content Reference

Use this document as the data-preparation checklist before publishing the portfolio. Never replace a placeholder with guessed information.

Status vocabulary:

- **REQUIRED** — needed for a credible production portfolio.
- **RECOMMENDED** — strongly improves professional context/SEO.
- **OPTIONAL** — include only when factual and useful.

## PROFILE

### Identity

- **REQUIRED** full name
- **REQUIRED** display/short name
- **REQUIRED** current professional role
- **RECOMMENDED** specialization — ID and EN
- **REQUIRED** professional headline — ID and EN
- **REQUIRED** location (city/region level is usually enough)
- **RECOMMENDED** timezone

Files: `src/shared/config/site.js`, `src/content/profile.js`.

### Narrative

- **REQUIRED** short bio — ID and EN
- **REQUIRED** long bio — ID and EN
- **REQUIRED** professional positioning — ID and EN
- **RECOMMENDED** working approach — ID and EN
- **RECOMMENDED** engineering principles — ID and EN
- **RECOMMENDED** values — ID and EN
- **RECOMMENDED** current focus — ID and EN
- **OPTIONAL** currently exploring — ID and EN
- **OPTIONAL** interests — ID and EN

### Career preferences

- **RECOMMENDED** availability — ID and EN
- **RECOMMENDED** preferred work mode — ID and EN
- **RECOMMENDED** employment preference — ID and EN
- **OPTIONAL** spoken languages and proficiency

## EXPERIENCE

For every real experience entry:

- **REQUIRED** stable `id`
- **REQUIRED** company
- **OPTIONAL** company URL
- **REQUIRED** role — ID and EN
- **RECOMMENDED** employment type
- **RECOMMENDED** location
- **RECOMMENDED** remote/hybrid/on-site context
- **REQUIRED** start date
- **REQUIRED** end date or `current: true`
- **REQUIRED** summary — ID and EN
- **REQUIRED** responsibilities — ID and EN
- **RECOMMENDED** achievements — ID and EN
- **RECOMMENDED** measurable outcomes — ID and EN, only with defensible figures
- **RECOMMENDED** technologies
- **OPTIONAL** related project slug

File: `src/content/experience.js`.

## EDUCATION

For every education entry:

- **REQUIRED** stable `id`
- **REQUIRED** institution
- **OPTIONAL** institution URL
- **REQUIRED** degree — ID and EN
- **REQUIRED** field — ID and EN
- **RECOMMENDED** location
- **REQUIRED** start/end dates
- **OPTIONAL** GPA — only if you want it public
- **OPTIONAL** thesis — ID and EN
- **OPTIONAL** honors — ID and EN
- **OPTIONAL** relevant coursework — ID and EN
- **OPTIONAL** activities — ID and EN
- **OPTIONAL** achievements — ID and EN

File: `src/content/education.js`.

## SKILLS

Categories already supported:

- Frontend
- Backend
- Database
- Architecture
- Testing
- DevOps
- Cloud
- Tooling
- UI
- Other

- **REQUIRED** replace placeholder skill names with real capabilities.
- **RECOMMENDED** keep the list concise and role-relevant.
- **DO NOT** add invented percentage proficiency bars.

File: `src/content/skills.js`.

## PROJECTS

Projects are the most important proof-of-work content.

### Identity

- **REQUIRED** unique slug
- **REQUIRED** title — ID and EN
- **RECOMMENDED** short title — ID and EN
- **REQUIRED** year/start/end dates
- **REQUIRED** status — ID and EN
- **RECOMMENDED** featured flag

### Professional context

- **REQUIRED** role — ID and EN
- **REQUIRED** project type — ID and EN
- **RECOMMENDED** team context — ID and EN
- **OPTIONAL** company/client when disclosure is allowed

### Links

- **OPTIONAL** live URL
- **OPTIONAL** repository URL
- **OPTIONAL** documentation URL

Never create a fake URL just to fill the UI.

### Technology

- **REQUIRED** stack
- **RECOMMENDED** tools

### Media

- **REQUIRED** cover screenshot for production
- **RECOMMENDED** thumbnail
- **REQUIRED** meaningful localized alt text
- **RECOMMENDED** screenshots/gallery where they support the story
- **RECOMMENDED** project-specific OG image

### Case study narrative

- **REQUIRED** summary
- **REQUIRED** context
- **REQUIRED** problem
- **REQUIRED** goals
- **RECOMMENDED** constraints
- **REQUIRED** solution
- **RECOMMENDED** architecture
- **REQUIRED** implementation
- **RECOMMENDED** engineering decisions
- **OPTIONAL** data flow where relevant
- **RECOMMENDED** accessibility decisions
- **RECOMMENDED** SEO decisions for web projects
- **RECOMMENDED** performance work
- **RECOMMENDED** challenges
- **RECOMMENDED** trade-offs
- **REQUIRED** results
- **RECOMMENDED** measurable outcomes, only if factual
- **RECOMMENDED** lessons learned

All narrative fields require ID and EN.

File: `src/content/projects.js`.

The repository currently includes three explicit placeholder projects. Replace or delete them; do not present them as real work.

## CERTIFICATIONS

Initial state is deliberately:

```js
export const certifications = [];
```

For each real credential:

- **REQUIRED** slug
- **REQUIRED** name
- **REQUIRED** issuer
- **OPTIONAL** issuer URL
- **REQUIRED** issued date
- **OPTIONAL** expiry date
- **OPTIONAL** credential ID
- **RECOMMENDED** verification URL
- **OPTIONAL** image
- **OPTIONAL** PDF
- **RECOMMENDED** related skills
- **RECOMMENDED** description — ID and EN
- **OPTIONAL** featured flag

File: `src/content/certifications.js`.

## CONTACT

- **REQUIRED** professional email
- **REQUIRED** GitHub URL for developer-oriented portfolios if available
- **RECOMMENDED** LinkedIn URL
- **OPTIONAL** phone number
- **RECOMMENDED** website/domain
- **OPTIONAL** additional professional social links

No contact form backend is included.

## ASSETS

- **REQUIRED** professional profile image or intentionally omit the image section
- **REQUIRED** favicon/icon assets
- **RECOMMENDED** 180×180 Apple icon
- **REQUIRED** default 1200×630 social/OG image
- **REQUIRED** project cover images/screenshots
- **RECOMMENDED** project-specific social images
- **RECOMMENDED** resume PDF if a download CTA is shown

Use optimized raster dimensions and descriptive alt text. Do not ship the `public/placeholders` assets as final brand assets.

## SEO

- **REQUIRED** production domain in `NEXT_PUBLIC_SITE_URL`
- **REQUIRED** unique localized title/description for key pages
- **REQUIRED** real site/person name
- **REQUIRED** final favicon/icons
- **REQUIRED** final OG image
- **RECOMMENDED** Google Search Console verification token
- **REQUIRED** review canonical and hreflang output after deployment
- **REQUIRED** submit `/sitemap.xml` in Search Console
- **REQUIRED** validate structured data after replacing placeholders
