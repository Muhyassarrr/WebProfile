import { Container } from "@/shared/design-system/Container";
import { PageHero } from "@/shared/design-system/PageHero";
import { ExperienceList } from "@/features/portfolio/presentation/ExperienceList";
import { getExperience } from "@/features/portfolio/application/portfolio";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { buildMetadata } from "@/shared/seo/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/experience", title: dict.seo.experience.title, description: dict.seo.experience.description });
}

export default async function ExperiencePage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return <main id="main-content"><PageHero eyebrow={dict.experience.eyebrow} title={dict.experience.title} description={dict.experience.description} /><section className="section"><Container><ExperienceList items={getExperience()} locale={locale} dict={dict} /></Container></section></main>;
}
