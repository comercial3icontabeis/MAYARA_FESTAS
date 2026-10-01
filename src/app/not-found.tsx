import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";

export default function NotFound() {
  return (
    <section
      className="container"
      style={{ minHeight: "80vh", display: "grid", alignContent: "center", gap: 24, paddingTop: "var(--nav-h)" }}
    >
      <p className="label dim">[ 404 ]</p>
      <h1 className="display" style={{ fontSize: "var(--fs-h2)" }}>
        Esta página <em>não existe.</em>
      </h1>
      <div>
        <Link href="/" className="btn">
          Voltar ao início <Arrow />
        </Link>
      </div>
    </section>
  );
}
