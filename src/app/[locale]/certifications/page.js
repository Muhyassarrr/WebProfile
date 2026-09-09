import { Container } from "@/shared/design-system/Container";
import { PageHero } from "@/shared/design-system/PageHero";
import { EmptyState } from "@/features/portfolio/presentation/EmptyState";
import { CertificationGrid } from "@/features/portfolio/presentation/CertificationGrid";
import { getCertifications } from "@/features/portfolio/application/portfolio";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { buildMetadata } from "@/shared/seo/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/certifications", title: dict.seo.certifications.title, description: dict.seo.certifications.description });
}

export default async function CertificationsPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const items = getCertifications();

  return (
    <main id="main-content">
      <PageHero eyebrow={dict.certifications.eyebrow} title={dict.certifications.title} description={dict.certifications.description} />
      <section className="section">
        <Container>
          {!items.length ? <EmptyState title={dict.certifications.emptyTitle} body={dict.certifications.emptyBody} /> : <CertificationGrid items={items} locale={locale} />}
        </Container>
      </section>
    </main>
  );
}
