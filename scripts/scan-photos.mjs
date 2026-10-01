/**
 * Detecta as fotos salvas em public/fotos e gera src/data/photo-manifest.json.
 *
 *   public/fotos/<slot>.jpg        → preenche o espaço <slot> (ex.: hero.jpg)
 *   public/fotos/galeria/*.jpg     → entram no portfólio, em ordem alfabética
 *
 * Roda sozinho antes de `npm run dev` e `npm run build` (ou manualmente: `npm run fotos`).
 */
import { readdirSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, parse } from "node:path";

const ROOT = process.cwd();
const DIR = join(ROOT, "public", "fotos");
const OUT = join(ROOT, "src", "data", "photo-manifest.json");
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const list = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isFile() && EXT.has(parse(d.name).ext.toLowerCase()))
        .map((d) => d.name)
        .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
    : [];

const slots = {};
for (const file of list(DIR)) slots[parse(file).name.toLowerCase()] = `/fotos/${file}`;
const galeria = list(join(DIR, "galeria")).map((f) => `/fotos/galeria/${f}`);

// O Next guarda as versões otimizadas pelo nome do arquivo. Ao trocar uma foto
// mantendo o mesmo nome, o cache antigo continuaria aparecendo — então limpamos.
rmSync(join(ROOT, ".next", "cache", "images"), { recursive: true, force: true });

mkdirSync(join(ROOT, "src", "data"), { recursive: true });
writeFileSync(OUT, JSON.stringify({ slots, galeria }, null, 2) + "\n");
console.log(`fotos: ${Object.keys(slots).length} espaço(s) preenchido(s), ${galeria.length} foto(s) na galeria`);
