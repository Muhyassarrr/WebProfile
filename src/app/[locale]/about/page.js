import { Container } from "@/shared/design-system/Container";
import { PageHero } from "@/shared/design-system/PageHero";
import { SectionHeader } from "@/shared/design-system/SectionHeader";
import { EducationList } from "@/features/portfolio/presentation/EducationList";
import { ExperienceList } from "@/features/portfolio/presentation/ExperienceList";
import { SkillGroups } from "@/features/portfolio/presentation/SkillGroups";
import { getEducation, getExperience, getProfile, getSkills } from "@/features/portfolio/application/portfolio";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { localizedPath } from "@/shared/i18n/routing";
import { buildMetadata, absoluteUrl } from "@/shared/seo/metadata";
import { JsonLd } from "@/shared/seo/JsonLdScript";
import { breadcrumbJsonLd, profilePageJsonLd } from "@/shared/seo/jsonLd";
import { localize, localizeList } from "@/shared/utils/localize";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/about", title: dict.seo.about.title, description: dict.seo.about.description });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const profile = getProfile();
  const experience = getExperience();
  const education = getEducation();
  const skills = getSkills();
  const crumbs = [
    { name: dict.nav.home, url: absoluteUrl(localizedPath(locale)) },
    { name: dict.nav.about, url: absoluteUrl(localizedPath(locale, "/about")) },
  ];
  const availability = localize(profile.career.availability, locale);

  return (
    <main id="main-content">
      <JsonLd data={profilePageJsonLd(profile, locale)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero eyebrow={dict.about.eyebrow} title={dict.about.title} description={dict.about.description} />

      <section className="section">
        <Container>
          <div className="profile-split">
            <div>
              <SectionHeader title={dict.about.story} />
              <div className="prose-card"><p>{localize(profile.narrative.longBio, locale)}</p></div>
            </div>
            <div>
              <SectionHeader title={dict.about.expertise} />
              <div className="prose-card"><p>{localize(profile.identity.specialization, locale)}</p></div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--muted"><Container><SectionHeader title={dict.about.workingApproach} /><div className="prose-card"><p>{localize(profile.narrative.workingApproach, locale)}</p></div></Container></section>
      <section className="section"><Container><SectionHeader title={dict.about.principles} /><TextList items={localizeList(profile.narrative.engineeringPrinciples, locale)} /></Container></section>
      <section className="section section--muted"><Container><SectionHeader title={dict.about.experience} /><ExperienceList items={experience} locale={locale} dict={dict} compact /></Container></section>
      <section className="section"><Container><SectionHeader title={dict.about.education} /><EducationList items={education} locale={locale} dict={dict} compact /></Container></section>
      <section className="section section--muted"><Container><SectionHeader title={dict.about.capabilities} /><SkillGroups skills={skills} /></Container></section>
      <section className="section"><Container><div className="profile-split"><div><SectionHeader title={dict.about.values} /><TextList items={localizeList(profile.narrative.values, locale)} /></div><div><SectionHeader title={dict.about.currentFocus} /><div className="prose-card"><p>{localize(profile.narrative.currentFocus, locale)}</p></div></div></div></Container></section>
      <section className="section section--muted"><Container><div className="profile-split"><div><SectionHeader title={dict.about.interests} /><TextList items={localizeList(profile.narrative.interests, locale)} /></div>{availability ? <div><SectionHeader title={dict.about.availability} /><div className="prose-card"><p>{availability}</p></div></div> : null}</div></Container></section>
    </main>
  );
}

function TextList({ items }) {
  return <div className="prose-card"><ul className="case-section__list">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
