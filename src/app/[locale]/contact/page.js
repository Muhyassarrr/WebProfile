import { Container } from "@/shared/design-system/Container";
import { PageHero } from "@/shared/design-system/PageHero";
import { getProfile } from "@/features/portfolio/application/portfolio";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { buildMetadata } from "@/shared/seo/metadata";
import { localize } from "@/shared/utils/localize";
import { getEmailHref, getExternalHref } from "@/shared/utils/links";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/contact", title: dict.seo.contact.title, description: dict.seo.contact.description });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const profile = getProfile();
  const emailHref = getEmailHref(profile.contact.email);
  const githubHref = getExternalHref(profile.social.github);
  const linkedinHref = getExternalHref(profile.social.linkedin);
  const phoneHref = profile.contact.phone ? `tel:${profile.contact.phone.replace(/[^+\d]/g, "")}` : null;
  const careerDetails = [
    [dict.contact.availability, localize(profile.career.availability, locale)],
    [dict.contact.workMode, localize(profile.career.preferredWorkMode, locale)],
    [dict.contact.employment, localize(profile.career.employmentPreference, locale)],
  ].filter(([, value]) => Boolean(value));
  return (
    <main id="main-content">
      <PageHero eyebrow={dict.contact.eyebrow} title={dict.contact.title} description={dict.contact.description} />
      <section className="section"><Container><div className="contact-grid">
        <section className="contact-card"><h2>{dict.contact.directTitle}</h2><ul className="contact-list">
          <li><span>{dict.common.email}</span>{emailHref ? <a className="text-link" href={emailHref}>{profile.contact.email}</a> : <span className="is-placeholder">{profile.contact.email}</span>}</li>
          {phoneHref ? <li><span>{dict.common.phone}</span><a className="text-link" href={phoneHref}>{profile.contact.phone}</a></li> : null}
          <li><span>{dict.common.github}</span>{githubHref ? <a className="text-link" href={githubHref} target="_blank" rel="noreferrer">{profile.social.github}</a> : <span className="is-placeholder">{profile.social.github}</span>}</li>
          <li><span>{dict.common.linkedin}</span>{linkedinHref ? <a className="text-link" href={linkedinHref} target="_blank" rel="noreferrer">{profile.social.linkedin}</a> : <span className="is-placeholder">{profile.social.linkedin}</span>}</li>
          <li><span>{dict.common.location}</span><span>{profile.identity.location}</span></li>
        </ul></section>
        {careerDetails.length ? <section className="contact-card"><h2>{dict.contact.availability}</h2><ul className="contact-list">
          {careerDetails.map(([label, value]) => <li key={label}><span>{label}</span><span>{value}</span></li>)}
        </ul></section> : null}
      </div></Container></section>
    </main>
  );
}
