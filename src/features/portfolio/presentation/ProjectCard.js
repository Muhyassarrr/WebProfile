import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/design-system/Badge";
import { localizedPath } from "@/shared/i18n/routing";
import { localize } from "@/shared/utils/localize";

export function ProjectCard({ project, locale, dict, priority = false }) {
  const title = localize(project.title, locale);
  return (
    <article className="project-card">
      <Link href={localizedPath(locale, `/projects/${project.slug}`)} className="project-card__media" aria-label={`${dict.common.viewCaseStudy}: ${title}`}>
        <Image src={project.media.thumbnail || project.media.cover} alt={localize(project.media.coverAlt, locale)} width={1200} height={750} sizes="(max-width: 768px) 100vw, 50vw" priority={priority} unoptimized={(project.media.thumbnail || project.media.cover)?.endsWith(".svg")} />
      </Link>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.year}</span>
          <span aria-hidden="true">·</span>
          <span>{localize(project.status, locale)}</span>
        </div>
        <div className="project-card__title-row">
          <h3><Link href={localizedPath(locale, `/projects/${project.slug}`)}>{title}</Link></h3>
          <div className="badge-row">
            {project.featured ? <Badge>{dict.common.featured}</Badge> : null}
            {project.placeholder ? <Badge tone="outline">{dict.common.placeholder}</Badge> : null}
          </div>
        </div>
        <p>{localize(project.caseStudy.summary, locale)}</p>
        <div className="chip-row" aria-label={dict.common.stack}>
          {project.technology.stack.slice(0, 5).map((item) => <span className="chip" key={item}>{item}</span>)}
        </div>
        <Link href={localizedPath(locale, `/projects/${project.slug}`)} className="text-link">{dict.common.viewCaseStudy} <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
