# Mayara Festas — site institucional

Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules · GSAP + ScrollTrigger + SplitText.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (todas as páginas são estáticas)
npm start
npm run typecheck
```

> Os scripts usam `--webpack`: o Turbopack do Next 16 falha no Windows ao baixar a fonte Manrope via `next/font`.

## Antes de publicar — preencha os dados reais

Nada no site foi inventado. Campos vazios aparecem como placeholders identificados (`[CIDADE]`, `[WHATSAPP]`, `[X]`, `[ FOTO ]`…) e ficam fora do Schema.org.

| O quê | Onde |
|---|---|
| Nome, WhatsApp, telefone, e-mail, Instagram, endereço, horários, cidades atendidas, URL do site | `src/config/company.ts` |
| Números (acervo, anos, eventos) — o contador só anima com número real | `company.stats` |
| Diferenciais e texto "Sobre" | `company.differentials`, `company.about` |
| Categorias do acervo (ordem, textos, fotos, produtos) | `src/data/collections.ts` |
| Tipos de evento | `src/data/events.ts` |
| Portfólio (somente eventos reais) | `src/data/portfolio.ts` |
| Depoimentos (somente reais, com autorização) | `src/data/testimonials.ts` |
| Etapas do "Como funciona" | `src/data/process.ts` |
| Fotos do hero, manifesto, imagine, antes/depois, sobre, CTA final | `src/data/media.ts` |
| Posição das etiquetas da seção "Imagine" | `imagineHotspots` em `src/data/media.ts` |
| Cor de destaque da marca | `--accent` em `src/app/globals.css` |
| Logo (opcional; sem logo usa wordmark tipográfico) | `company.logo` → arquivo em `/public/images` |

**WhatsApp:** somente dígitos com DDI + DDD (ex.: `55` + DDD + número). Sem número, os botões "Falar no WhatsApp" viram "Solicitar orçamento" e o formulário oferece "Copiar mensagem" — nenhum CTA fica quebrado.

### Fotografias

Coloque os arquivos em `public/images/` e informe o caminho no campo `src` (ex.: `src: "/images/hero.jpg"`). Use JPG/WebP de alta qualidade, lado maior ≥ 2400px — o Next Image gera AVIF/WebP responsivos e faz lazy loading. Cada placeholder mostra a pauta da foto esperada (`brief`). Antes/depois devem ter o mesmo enquadramento.

## Estrutura

```
src/
  app/            rotas: /, /acervo, /acervo/[slug], /eventos, /eventos/[slug], /sobre, /contato
                  + sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx
  components/     seções (Hero, EditorialIntro, CollectionSection, HorizontalCollection,
                  ImagineSection, EventTypes, Portfolio, BeforeAfter, ProcessTimeline,
                  TrustSection, Testimonials, About, FinalCTA, Footer, Navbar, QuoteForm…)
  motion/         RevealText, RevealImage, ParallaxImage, HorizontalScroll, ClipReveal,
                  ImageMask, AnimatedCounter, MagneticButton, PageTransition, MotionProvider
  config/         company.ts
  data/           collections, events, testimonials, portfolio, process, media
  lib/            gsap (registro + media queries), whatsapp, schema (JSON-LD), nav
```

Novas categorias ou eventos adicionados aos arquivos de dados ganham página, sitemap e links automaticamente.

## Movimento e acessibilidade

- Toda animação roda dentro de `gsap.matchMedia()`; com `prefers-reduced-motion: reduce` não há parallax, pins nem rolagem horizontal, e todo o conteúdo fica visível.
- Desktop (≥ 900px): seções fixadas, rolagem horizontal do acervo e timeline de processo. Mobile: composição própria, acervo com swipe nativo.
- **Atenção ao testar no Windows:** se "Efeitos de animação" estiver desligado (Configurações → Acessibilidade → Efeitos visuais), o navegador informa movimento reduzido e o site mostra a versão estática.

## SEO

Metadata, canonical e Open Graph por página; `sitemap.xml`, `robots.txt`, favicon, imagem OG gerada; JSON-LD `LocalBusiness` + `WebSite` + `BreadcrumbList` (somente com dados preenchidos); um H1 por página. Defina `company.siteUrl` com o domínio final antes de publicar.
