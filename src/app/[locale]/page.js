import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/design-system/Button";
import { Container } from "@/shared/design-system/Container";
import { SectionHeader } from "@/shared/design-system/SectionHeader";
import { ProjectCard } from "@/features/portfolio/presentation/ProjectCard";
import { ExperienceList } from "@/features/portfolio/presentation/ExperienceList";
import { SkillGroups } from "@/features/portfolio/presentation/SkillGroups";
import { CertificationGrid } from "@/features/portfolio/presentation/CertificationGrid";
import { getCertifications, getExperience, getFeaturedProjects, getProfile, getSkills } from "@/features/portfolio/application/portfolio";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { localizedPath } from "@/shared/i18n/routing";
import { buildMetadata } from "@/shared/seo/metadata";
import { JsonLd } from "@/shared/seo/JsonLdScript";
import { personJsonLd, websiteJsonLd } from "@/shared/seo/jsonLd";
import { localize } from "@/shared/utils/localize";
import { getEmailHref, getPublicHref } from "@/shared/utils/links";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.seo.home.title, description: dict.seo.home.description });
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const profile = getProfile();
  const projects = getFeaturedProjects();
  const experience = getExperience();
  const skills = getSkills();
  const certifications = getCertifications();
  const emailHref = getEmailHref(profile.contact.email);
  const resumeHref = getPublicHref(profile.assets.resumePdf);
  const heroMeta = [profile.identity.role, profile.identity.location, localize(profile.career.availability, locale)].filter(Boolean);
  const profileFacts = [
    [dict.common.location, profile.identity.location],
    [dict.contact.workMode, localize(profile.career.preferredWorkMode, locale)],
    [dict.contact.availability, localize(profile.career.availability, locale)],
    [dict.contact.employment, localize(profile.career.employmentPreference, locale)],
  ].filter(([, value]) => Boolean(value));

  return (
    <main id="main-content">
      <JsonLd data={websiteJsonLd(locale)} />
      <JsonLd data={personJsonLd(profile, locale)} />

      <section className="hero">
        <Container className="hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">{dict.home.eyebrow}</p>
            <h1>{profile.identity.displayName}</h1>
            <p className="hero__headline">{localize(profile.identity.professionalHeadline, locale)}</p>
            <p className="hero__positioning">{localize(profile.narrative.professionalPositioning, locale)}</p>
            <div className="hero__actions">
              <Button href={localizedPath(locale, "/projects")}>{dict.common.viewProjects}</Button>
              <Button href={localizedPath(locale, "/contact")} variant="secondary">{dict.common.contactMe}</Button>
              {resumeHref ? <Button href={resumeHref} external={/^https?:\/\//i.test(resumeHref)} variant="ghost">{dict.common.downloadResume}</Button> : null}
            </div>
            <div className="hero__meta">
              {heroMeta.map((item, index) => (
                <span key={item}>{index ? <>· <span>{item}</span></> : item}</span>
              ))}
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__image-frame">
              <Image src={profile.assets.profileImage} alt="" width={720} height={900} sizes="360px" priority unoptimized={profile.assets.profileImage?.endsWith(".svg")} />
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--muted">
        <Container>
          <SectionHeader
            eyebrow={dict.nav.projects}
            title={dict.home.featuredProjectsTitle}
            description={dict.home.featuredProjectsDescription}
            actions={<Link className="text-link" href={localizedPath(locale, "/projects")}>{dict.common.viewAll} ↗</Link>}
          />
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} dict={dict} priority={index === 0} />)}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader eyebrow={dict.nav.about} title={dict.home.professionalIntroTitle} description={dict.home.introTitle} />
          <div className="profile-split">
            <div className="prose-card"><h3>{dict.about.story}</h3><p>{localize(profile.narrative.longBio, locale)}</p></div>
            <dl className="profile-facts">
              {profileFacts.map(([label, value]) => <div className="fact" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
        </Container>
      </section>

      <section className="section section--muted">
        <Container>
          <SectionHeader eyebrow={dict.nav.experience} title={dict.home.experienceTitle} actions={<Link className="text-link" href={localizedPath(locale, "/experience")}>{dict.common.viewAll} ↗</Link>} />
          <ExperienceList items={experience.slice(0, 2)} locale={locale} dict={dict} compact />
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader eyebrow={dict.nav.skills} title={dict.home.skillsTitle} actions={<Link className="text-link" href={localizedPath(locale, "/skills")}>{dict.common.viewAll} ↗</Link>} />
          <SkillGroups skills={skills} />
        </Container>
      </section>

      {certifications.length ? (
        <section className="section section--muted">
          <Container>
            <SectionHeader eyebrow={dict.nav.certifications} title={dict.home.certificationTitle} actions={<Link className="text-link" href={localizedPath(locale, "/certifications")}>{dict.common.viewAll} ↗</Link>} />
            <CertificationGrid items={certifications.slice(0, 2)} locale={locale} />
          </Container>
        </section>
      ) : null}

      <section className="section">
        <Container>
          <div className="cta-panel">
            <h2>{dict.home.ctaTitle}</h2>
            <p>{dict.home.ctaBody}</p>
            <div className="hero__actions">
              <Button href={emailHref} external={Boolean(emailHref)} variant="secondary">{dict.common.contactMe}</Button>
              <Button href={localizedPath(locale, "/contact")} variant="ghost">{dict.nav.contact}</Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
