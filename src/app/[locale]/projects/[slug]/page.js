import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/shared/design-system/Button";
import { Container } from "@/shared/design-system/Container";
import { Badge } from "@/shared/design-system/Badge";
import { Breadcrumbs } from "@/features/portfolio/presentation/Breadcrumbs";
import { CaseStudySection } from "@/features/portfolio/presentation/CaseStudySection";
import { ProjectCard } from "@/features/portfolio/presentation/ProjectCard";
import { getProjectBySlug, getProjects } from "@/features/portfolio/application/portfolio";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { localizedPath } from "@/shared/i18n/routing";
import { buildMetadata, absoluteUrl } from "@/shared/seo/metadata";
import { JsonLd } from "@/shared/seo/JsonLdScript";
import { breadcrumbJsonLd, projectJsonLd } from "@/shared/seo/jsonLd";
import { formatDateRange } from "@/shared/utils/dates";
import { getExternalHref } from "@/shared/utils/links";
import { localize } from "@/shared/utils/localize";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = localize(project.title, locale);
  const description = localize(project.caseStudy.summary, locale);
  return buildMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title,
    description,
    image: project.media.ogImage || undefined,
    type: "article",
  });
}

export default async function ProjectDetailPage({ params }) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const dict = getDictionary(locale);
  const title = localize(project.title, locale);
  const projectUrl = absoluteUrl(localizedPath(locale, `/projects/${project.slug}`));
  const breadcrumbs = [
    { label: dict.nav.home, href: localizedPath(locale) },
    { label: dict.nav.projects, href: localizedPath(locale, "/projects") },
    { label: title, href: localizedPath(locale, `/projects/${project.slug}`) },
  ];
  const breadcrumbData = breadcrumbs.map((item) => ({ name: item.label, url: absoluteUrl(item.href) }));
  const otherProjects = getProjects().filter((item) => item.slug !== project.slug).slice(0, 2);
  const sectionMap = [
    ["context", dict.projectCaseStudy.context, project.caseStudy.context],
    ["problem", dict.projectCaseStudy.problem, project.caseStudy.problem],
    ["goals", dict.projectCaseStudy.goals, project.caseStudy.goals],
    ["constraints", dict.projectCaseStudy.constraints, project.caseStudy.constraints],
    ["solution", dict.projectCaseStudy.solution, project.caseStudy.solution],
    ["architecture", dict.projectCaseStudy.architecture, project.caseStudy.architecture],
    ["implementation", dict.projectCaseStudy.implementation, project.caseStudy.implementation],
    ["engineering-decisions", dict.projectCaseStudy.engineeringDecisions, project.caseStudy.engineeringDecisions],
    ["data-flow", dict.projectCaseStudy.dataFlow, project.caseStudy.dataFlow],
    ["accessibility", dict.projectCaseStudy.accessibility, project.caseStudy.accessibility],
    ["seo", dict.projectCaseStudy.seo, project.caseStudy.seo],
    ["performance", dict.projectCaseStudy.performance, project.caseStudy.performance],
    ["challenges", dict.projectCaseStudy.challenges, project.caseStudy.challenges],
    ["tradeoffs", dict.projectCaseStudy.tradeoffs, project.caseStudy.tradeoffs],
    ["results", dict.projectCaseStudy.results, project.caseStudy.results],
    ["measurable-outcomes", dict.projectCaseStudy.measurableOutcomes, project.caseStudy.measurableOutcomes],
    ["lessons-learned", dict.projectCaseStudy.lessonsLearned, project.caseStudy.lessonsLearned],
  ];
  const visibleSections = sectionMap.filter(([, , value]) => {
    const content = localize(value, locale);
    return Array.isArray(content) ? content.some(Boolean) : Boolean(content);
  });
  const liveHref = getExternalHref(project.links.liveUrl);
  const repoHref = getExternalHref(project.links.repositoryUrl);
  const docsHref = getExternalHref(project.links.documentationUrl);

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd(breadcrumbData)} />
      <JsonLd data={projectJsonLd(project, locale, projectUrl)} />

      <Container><Breadcrumbs items={breadcrumbs} /></Container>
      <section className="case-hero">
        <Container className="case-hero__grid">
          <div className="case-hero__copy">
            <div className="badge-row">
              {project.featured ? <Badge>{dict.common.featured}</Badge> : null}
              {project.placeholder ? <Badge tone="outline">{dict.common.placeholder}</Badge> : null}
            </div>
            <h1>{title}</h1>
            <p>{localize(project.caseStudy.summary, locale)}</p>
            <div className="case-links">
              {liveHref ? <Button href={liveHref} external>{dict.common.liveProject}</Button> : null}
              {repoHref ? <Button href={repoHref} external variant="secondary">{dict.common.repository}</Button> : null}
              {docsHref ? <Button href={docsHref} external variant="secondary">{dict.common.documentation}</Button> : null}
            </div>
          </div>
          <div className="case-hero__media">
            <Image src={project.media.cover} alt={localize(project.media.coverAlt, locale)} width={1200} height={750} sizes="(max-width: 900px) 100vw, 50vw" priority />
          </div>
        </Container>
      </section>

      <section className="section section--muted">
        <Container>
          <dl className="project-overview">
            <OverviewItem label={dict.common.role} value={localize(project.role, locale)} />
            <OverviewItem label={dict.common.timeline} value={formatDateRange(project.startDate, project.endDate, false, locale, dict.common.present)} />
            <OverviewItem label={dict.common.type} value={localize(project.projectType, locale)} />
            <OverviewItem label={dict.common.status} value={localize(project.status, locale)} />
          </dl>
          <div className="chip-row chip-row--spaced">
            {project.technology.stack.map((item) => <span className="chip" key={item}>{item}</span>)}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="case-layout">
          <aside className="case-toc" aria-label="Case study sections">
            <p className="eyebrow">{dict.projectCaseStudy.overview}</p>
            <nav>{visibleSections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
          </aside>
          <div className="case-content">
            {visibleSections.map(([id, label, value]) => <CaseStudySection key={id} id={id} title={label} value={value} locale={locale} />)}

            {project.media.gallery?.length ? (
              <section className="case-section" id="gallery">
                <h2>{dict.projectCaseStudy.gallery}</h2>
                <div className="gallery-grid">{project.media.gallery.map((item) => <Image key={item.src} src={item.src} alt={localize(item.alt, locale)} width={1200} height={750} sizes="100vw" />)}</div>
              </section>
            ) : null}

            {(liveHref || repoHref || docsHref) ? (
              <section className="case-section" id="project-links">
                <h2>{dict.projectCaseStudy.links}</h2>
                <div className="case-links">
                  {liveHref ? <Button href={liveHref} external>{dict.common.liveProject}</Button> : null}
                  {repoHref ? <Button href={repoHref} external variant="secondary">{dict.common.repository}</Button> : null}
                  {docsHref ? <Button href={docsHref} external variant="secondary">{dict.common.documentation}</Button> : null}
                </div>
              </section>
            ) : null}
          </div>
        </Container>
      </section>

      {otherProjects.length ? (
        <section className="section section--muted">
          <Container>
            <div className="section-header"><div className="section-header__copy"><p className="eyebrow">{dict.nav.projects}</p><h2 className="section-title">{dict.common.otherProjects}</h2></div><Link className="text-link" href={localizedPath(locale, "/projects")}>{dict.common.backToProjects} ↗</Link></div>
            <div className="project-grid">{otherProjects.map((item) => <ProjectCard key={item.slug} project={item} locale={locale} dict={dict} />)}</div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}

function OverviewItem({ label, value }) {
  if (!value) return null;
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}
