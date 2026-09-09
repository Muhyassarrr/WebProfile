export function SectionHeader({ eyebrow, title, description, actions, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;
  return (
    <div className="section-header">
      <div className="section-header__copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Heading className="section-title">{title}</Heading>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
      {actions ? <div className="section-header__actions">{actions}</div> : null}
    </div>
  );
}
