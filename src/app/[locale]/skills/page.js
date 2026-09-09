import { Container } from "@/shared/design-system/Container";
import { PageHero } from "@/shared/design-system/PageHero";
import { SkillGroups } from "@/features/portfolio/presentation/SkillGroups";
import { getSkills } from "@/features/portfolio/application/portfolio";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { buildMetadata } from "@/shared/seo/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/skills", title: dict.seo.skills.title, description: dict.seo.skills.description });
}

export default async function SkillsPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return <main id="main-content"><PageHero eyebrow={dict.skills.eyebrow} title={dict.skills.title} description={dict.skills.description} /><section className="section"><Container><SkillGroups skills={getSkills()} /></Container></section></main>;
}
