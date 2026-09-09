import { Container } from "./Container";

export function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="page-hero">
      <Container>
        <div className="page-hero__content">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title">{title}</h1>
          {description ? <p className="page-description">{description}</p> : null}
          {children ? <div className="page-hero__actions">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
