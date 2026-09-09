import { Badge } from "@/shared/design-system/Badge";
import { SafeExternalLink } from "@/shared/design-system/SafeExternalLink";
import { formatDateRange } from "@/shared/utils/dates";
import { localize, localizeList } from "@/shared/utils/localize";

export function ExperienceList({ items, locale, dict, compact = false }) {
  if (!items?.length) return null;
  return (
    <div className="timeline-list">
      {items.map((item) => (
        <article className="timeline-item" key={item.id}>
          <div className="timeline-item__meta">
            <p>{formatDateRange(item.startDate, item.endDate, item.current, locale, dict.common.present)}</p>
            {item.placeholder ? <Badge tone="outline">{dict.common.placeholder}</Badge> : null}
          </div>
          <div className="timeline-item__body">
            <p className="timeline-item__kicker">{localize(item.role, locale)}</p>
            <h3><SafeExternalLink href={item.companyUrl} className="subtle-link">{item.company}</SafeExternalLink></h3>
            <p className="timeline-item__summary">{localize(item.summary, locale)}</p>
            {!compact ? (
              <>
                {localizeList(item.responsibilities, locale).length ? <DetailList title={dict.experience.responsibilities} items={localizeList(item.responsibilities, locale)} /> : null}
                {localizeList(item.achievements, locale).length ? <DetailList title={dict.experience.achievements} items={localizeList(item.achievements, locale)} /> : null}
                {localizeList(item.measurableOutcomes, locale).length ? <DetailList title={dict.experience.outcomes} items={localizeList(item.measurableOutcomes, locale)} /> : null}
              </>
            ) : null}
            {item.technologies?.length ? <div className="chip-row">{item.technologies.map((tech) => <span className="chip" key={tech}>{tech}</span>)}</div> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function DetailList({ title, items }) {
  return (
    <div className="detail-list">
      <h4>{title}</h4>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
