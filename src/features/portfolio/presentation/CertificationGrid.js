import { SafeExternalLink } from "@/shared/design-system/SafeExternalLink";
import { formatDate } from "@/shared/utils/dates";
import { localize } from "@/shared/utils/localize";

export function CertificationGrid({ items, locale }) {
  if (!items?.length) return null;

  return (
    <div className="project-grid">
      {items.map((item) => {
        const dateRange = [formatDate(item.issuedAt, locale), item.expiresAt ? formatDate(item.expiresAt, locale) : null].filter(Boolean).join(" — ");
        return (
          <article className="prose-card" key={item.slug}>
            <p className="eyebrow">{item.issuer}</p>
            <h2>{item.name}</h2>
            {localize(item.description, locale) ? <p>{localize(item.description, locale)}</p> : null}
            {dateRange ? <p>{dateRange}</p> : null}
            {item.skills?.length ? <div className="chip-row chip-row--spaced">{item.skills.map((skill) => <span className="chip" key={skill}>{skill}</span>)}</div> : null}
            {item.credentialId ? <p><strong>Credential:</strong> {item.credentialId}</p> : null}
            {item.credentialUrl ? <SafeExternalLink href={item.credentialUrl}>Verify credential</SafeExternalLink> : null}
          </article>
        );
      })}
    </div>
  );
}
