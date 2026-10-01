/**
 * Pós-build do export estático (GitHub Pages).
 *
 * O Next 16 grava os arquivos de prefetch em pastas
 *   acervo/x/__next.acervo/$d$slug/__PAGE__.txt
 * mas o navegador pede o nome "achatado", com pontos:
 *   acervo/x/__next.acervo.$d$slug.__PAGE__.txt
 * Num servidor Next isso é traduzido sozinho; no GitHub Pages (só arquivos)
 * não. Este script cria as cópias com o nome achatado.
 */
import { readdirSync, statSync, copyFileSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = join(process.cwd(), "out");
let count = 0;

const files = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : [p];
  });

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const f of files(p)) {
        const flat = join(dir, relative(dir, f).split(sep).join("."));
        if (!existsSync(flat)) {
          copyFileSync(f, flat);
          count++;
        }
      }
    } else {
      walk(p);
    }
  }
}

if (existsSync(OUT)) walk(OUT);
console.log(`segmentos de prefetch achatados: ${count}`);
