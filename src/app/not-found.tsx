import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="container"
      style={{ minHeight: "80vh", display: "grid", alignContent: "center", gap: 24, paddingTop: "var(--nav-h)" }}
    >
      <h1 className="display" style={{ fontSize: "var(--fs-h2)" }}>
        Esta página não existe.
      </h1>
      <div>
        <Link href="/" className="btn">
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
