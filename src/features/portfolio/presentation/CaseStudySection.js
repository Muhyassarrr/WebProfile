import { localize, localizeList } from "@/shared/utils/localize";

export function CaseStudySection({ id, title, value, locale }) {
  if (value == null) return null;
  const list = localizeList(value, locale);
  const text = localize(value, locale);
  const isList = Array.isArray(text);
  if ((isList && !list.length) || (!isList && !text)) return null;

  return (
    <section className="case-section" id={id}>
      <h2>{title}</h2>
      {isList ? <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{text}</p>}
    </section>
  );
}
