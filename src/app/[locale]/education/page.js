import { Container } from "@/shared/design-system/Container";
import { PageHero } from "@/shared/design-system/PageHero";
import { EducationList } from "@/features/portfolio/presentation/EducationList";
import { getEducation } from "@/features/portfolio/application/portfolio";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { buildMetadata } from "@/shared/seo/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/education", title: dict.seo.education.title, description: dict.seo.education.description });
}

export default async function EducationPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return <main id="main-content"><PageHero eyebrow={dict.education.eyebrow} title={dict.education.title} description={dict.education.description} /><section className="section"><Container><EducationList items={getEducation()} locale={locale} dict={dict} /></Container></section></main>;
}
