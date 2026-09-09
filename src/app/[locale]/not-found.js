import Link from "next/link";
import { Container } from "@/shared/design-system/Container";

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <Container>
          <div className="page-hero__content">
            <p className="eyebrow">404</p>
            <h1 className="page-title">Page not found / Halaman tidak ditemukan</h1>
            <p className="page-description">The requested locale, page, or project does not exist. URL locale, halaman, atau project yang diminta tidak tersedia.</p>
            <div className="page-hero__actions">
              <Link className="button button--primary" href="/id">Beranda ID</Link>
              <Link className="button button--secondary" href="/en">English home</Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
