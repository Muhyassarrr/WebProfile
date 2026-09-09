import { Badge } from "@/shared/design-system/Badge";
import { SafeExternalLink } from "@/shared/design-system/SafeExternalLink";
import { formatDateRange } from "@/shared/utils/dates";
import { localize, localizeList } from "@/shared/utils/localize";

export function EducationList({ items, locale, dict, compact = false }) {
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
            <p className="timeline-item__kicker">{localize(item.degree, locale)} · {localize(item.field, locale)}</p>
            <h3><SafeExternalLink href={item.institutionUrl} className="subtle-link">{item.institution}</SafeExternalLink></h3>
            {!compact ? (
              <div className="education-details">
                {item.gpa ? <p><strong>{dict.education.gpa}:</strong> {item.gpa}</p> : null}
                {localize(item.thesis, locale) ? <p><strong>{dict.education.thesis}:</strong> {localize(item.thesis, locale)}</p> : null}
                <EducationDetail title={dict.education.honors} items={localizeList(item.honors, locale)} />
                <EducationDetail title={dict.education.coursework} items={localizeList(item.relevantCoursework, locale)} />
                <EducationDetail title={dict.education.activities} items={localizeList(item.activities, locale)} />
                <EducationDetail title={dict.education.achievements} items={localizeList(item.achievements, locale)} />
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function EducationDetail({ title, items }) {
  if (!items.length) return null;
  return <div className="detail-list"><h4>{title}</h4><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
