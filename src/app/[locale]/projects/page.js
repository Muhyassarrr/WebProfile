import { Container } from "@/shared/design-system/Container";
import { PageHero } from "@/shared/design-system/PageHero";
import { ProjectCard } from "@/features/portfolio/presentation/ProjectCard";
import { getProjects } from "@/features/portfolio/application/portfolio";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { localizedPath } from "@/shared/i18n/routing";
import { buildMetadata, absoluteUrl } from "@/shared/seo/metadata";
import { JsonLd } from "@/shared/seo/JsonLdScript";
import { breadcrumbJsonLd } from "@/shared/seo/jsonLd";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/projects", title: dict.seo.projects.title, description: dict.seo.projects.description });
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const projects = getProjects();
  const crumbs = [
    { name: dict.nav.home, url: absoluteUrl(localizedPath(locale)) },
    { name: dict.nav.projects, url: absoluteUrl(localizedPath(locale, "/projects")) },
  ];

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero eyebrow={dict.projects.eyebrow} title={dict.projects.title} description={dict.projects.description} />
      <section className="section">
        <Container>
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} dict={dict} priority={index < 2} />)}
          </div>
        </Container>
      </section>
    </main>
  );
}
